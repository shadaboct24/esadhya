package mongodbexample.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mongodbexample.model.IsaaAssessment;
import mongodbexample.model.SensoryAssessmentResult;
import mongodbexample.model.SensoryScreeningAssessment;
import mongodbexample.repository.IsaaAssessmentRepository;
import mongodbexample.repository.SensoryScreeningAssessmentRepository;

@Service
public class IsaaAssessmentPDFGenerationService {
    
    @Autowired
    private IsaaAssessmentRepository assessmentRepository;
    
    @Autowired
    private SensoryScreeningAssessmentRepository screeningRepository;
    
    private static final float MARGIN = 50;
    private static final float TABLE_WIDTH = PDRectangle.A4.getWidth() - (2 * MARGIN);
    private static final float ROW_HEIGHT = 20;
    private static final float HEADER_HEIGHT = 25;
    private static final float CELL_PADDING = 5;
    private static final float FONT_SIZE = 10;
    
    public byte[] generateAssessmentReport(String childId, String childName) throws Exception {
        IsaaAssessment assessment = assessmentRepository.findByChildId(childId)
            .stream()
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Assessment not found"));

        List<SensoryScreeningAssessment> screeningQuestions = 
            screeningRepository.findByAssesstypeid("ASSESSTYPE_1");

        // Create mapping for questions and sections
        Map<String, String> questionMap = new HashMap<>();
        Map<String, String> sectionMap = new HashMap<>();
        for (SensoryScreeningAssessment screening : screeningQuestions) {
            for (SensoryScreeningAssessment.Subsection subsection : screening.getSubsection_details()) {
                questionMap.put(subsection.getSubsecid(), subsection.getSubsecname());
                sectionMap.put(subsection.getSubsecid(), screening.getSectionname());
            }
        }

        PDDocument document = new PDDocument();
        PDPage page = new PDPage(PDRectangle.A4);
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        // Draw title and header information
        float yPosition = page.getMediaBox().getHeight() - MARGIN;
        
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
        contentStream.newLineAtOffset(MARGIN, yPosition);
        contentStream.showText("Isaa Assessment Report");
        contentStream.endText();
        
        yPosition -= 30;
        
        // Add child details in a structured format
        String[][] childDetails = {
            {"Name of the Child", ": " + childName},
            {"Date Of Assessment", ": " + assessment.getAssessmentDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))},
            {"Score of the child",": "+ assessment.getScore()},
            {"Autism Classisfication",": "+ getAutismLevel(assessment.getScore())},
            {"Recommendation",": "+ assessment.getRecommendation()}
        };
        
        for (String[] detail : childDetails) {
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 11);
            contentStream.newLineAtOffset(MARGIN, yPosition);
            contentStream.showText(detail[0]);
            contentStream.setFont(PDType1Font.HELVETICA, 11);
            contentStream.newLineAtOffset(150, 0);
            contentStream.showText(detail[1]);
            contentStream.endText();
            yPosition -= 20;
        }
        
        yPosition -= 20;

        // Draw table headers
        float[] columnWidths = {40, TABLE_WIDTH - 140, 100};
//        String[] headers = {"S.No", "Sensory Details", "Result"};
        
        // Group responses by section
        Map<String, List<SensoryAssessmentResult.SensoryResponse>> sectionResponses = new HashMap<>();
        for (SensoryAssessmentResult.SensoryResponse response : assessment.getResponses()) {
            String section = sectionMap.get(response.getSubsecid());
            sectionResponses.computeIfAbsent(section, k -> new ArrayList<>()).add(response);
        }

        // Draw sections and responses
        int serialNumber = 1;
        for (Map.Entry<String, List<SensoryAssessmentResult.SensoryResponse>> entry : sectionResponses.entrySet()) {
            // Check if we need a new page
            if (yPosition < 100) {
                contentStream.close();
                page = new PDPage(PDRectangle.A4);
                document.addPage(page);
                contentStream = new PDPageContentStream(document, page);
                yPosition = page.getMediaBox().getHeight() - MARGIN;
            }

            // Draw section header
            drawTableCell(contentStream, MARGIN, yPosition, TABLE_WIDTH, HEADER_HEIGHT, entry.getKey(), true,true);
            yPosition -= HEADER_HEIGHT;

            // Draw responses
            for (SensoryAssessmentResult.SensoryResponse response : entry.getValue()) {
                if (yPosition < 100) {
                    contentStream.close();
                    page = new PDPage(PDRectangle.A4);
                    document.addPage(page);
                    contentStream = new PDPageContentStream(document, page);
                    yPosition = page.getMediaBox().getHeight() - MARGIN;
                }

                float xPosition = MARGIN;
                String question = questionMap.get(response.getSubsecid());
                
                // Calculate required height for the question
                float questionWidth = columnWidths[1] - (2 * CELL_PADDING);
                float cellHeight = calculateRequiredHeight(question, questionWidth);
                float finalRowHeight = Math.max(ROW_HEIGHT, cellHeight);
                
                // Draw serial number
                drawTableCell(contentStream, xPosition, yPosition, columnWidths[0], finalRowHeight, 
                    String.valueOf(serialNumber), false, true);
                xPosition += columnWidths[0];
                
                // Draw question
                drawTableCell(contentStream, xPosition, yPosition, columnWidths[1], finalRowHeight, 
                    question, false, false);
                xPosition += columnWidths[1];
                
                // Draw response
                drawTableCell(contentStream, xPosition, yPosition, columnWidths[2], finalRowHeight, 
                    response.getOption(), false, true);
                
                yPosition -= finalRowHeight;
                serialNumber++;
            }
        }
        
        // Add report generation timestamp
        yPosition -= 30;
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA, 9);
        contentStream.newLineAtOffset(MARGIN, yPosition);
        contentStream.showText("Report generated on: " + LocalDateTime.now().format(
            DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
        contentStream.endText();

        contentStream.close();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        document.save(byteArrayOutputStream);
        document.close();

        return byteArrayOutputStream.toByteArray();
    }
    
    private float calculateRequiredHeight(String text, float maxWidth) throws IOException {
        if (text == null || text.trim().isEmpty()) {
            return ROW_HEIGHT;
        }

        String[] words = text.split(" ");
        List<String> lines = new ArrayList<>();
        StringBuilder currentLine = new StringBuilder();
        float textWidth = 0;

        for (String word : words) {
            float wordWidth = (PDType1Font.HELVETICA.getStringWidth(word + " ") / 1000) * FONT_SIZE;
            
            if (textWidth + wordWidth <= maxWidth) {
                currentLine.append(word).append(" ");
                textWidth += wordWidth;
            } else {
                lines.add(currentLine.toString().trim());
                currentLine = new StringBuilder(word + " ");
                textWidth = wordWidth;
            }
        }
        
        if (currentLine.length() > 0) {
            lines.add(currentLine.toString().trim());
        }

        return Math.max(ROW_HEIGHT, (lines.size() * (FONT_SIZE + 2)) + (2 * CELL_PADDING));
    }
    
    private void drawTableCell(PDPageContentStream contentStream, float x, float y, 
                             float width, float height, String text, boolean isHeader, 
                             boolean centerText) throws IOException {
        // Draw cell border
        contentStream.setStrokingColor(0f, 0f, 0f);
        contentStream.addRect(x, y, width, -height);
        contentStream.stroke();

        // Fill header cells with color
        if (isHeader) {
            contentStream.setNonStrokingColor(0f, 0.5f, 0.5f);
            contentStream.addRect(x, y, width, -height);
            contentStream.fill();
            contentStream.setNonStrokingColor(1f, 1f, 1f);
        } else {
            contentStream.setNonStrokingColor(0f, 0f, 0f);
        }

        if (text == null || text.trim().isEmpty()) {
            return;
        }

        // Calculate available width for text
        float availableWidth = width - (2 * CELL_PADDING);
        float textY = y - CELL_PADDING - FONT_SIZE;  // Start from top of cell

        String[] words = text.split(" ");
        StringBuilder currentLine = new StringBuilder();
        float textWidth = 0;

        contentStream.beginText();
        contentStream.setFont(isHeader ? PDType1Font.HELVETICA_BOLD : PDType1Font.HELVETICA, FONT_SIZE);

        for (String word : words) {
            float wordWidth = (PDType1Font.HELVETICA.getStringWidth(word + " ") / 1000) * FONT_SIZE;
            
            if (textWidth + wordWidth <= availableWidth) {
                currentLine.append(word).append(" ");
                textWidth += wordWidth;
            } else {
                // Draw current line
                float textX = centerText ? 
                    x + ((width - textWidth) / 2) : 
                    x + CELL_PADDING;
                    
                contentStream.newLineAtOffset(textX, textY);
                contentStream.showText(currentLine.toString().trim());
                contentStream.endText();
                
                // Start new line
                currentLine = new StringBuilder(word + " ");
                textWidth = wordWidth;
                textY -= (FONT_SIZE + 2);
                
                contentStream.beginText();
                contentStream.setFont(isHeader ? PDType1Font.HELVETICA_BOLD : PDType1Font.HELVETICA, FONT_SIZE);
            }
        }

        // Draw last line if any
        if (currentLine.length() > 0) {
            float textX = centerText ? 
                x + ((width - textWidth) / 2) : 
                x + CELL_PADDING;
                
            contentStream.newLineAtOffset(textX, textY);
            contentStream.showText(currentLine.toString().trim());
        }
        
        contentStream.endText();
    }
    
    private String getAutismLevel(Integer score) {
        if (score < 70) {
            return "No Autism";
        } else if (score >= 70 && score <= 106) {
            return "Mild Autism";
        } else if (score >= 107 && score <= 153) {
            return "Moderate Autism";
        } else {
            return "Severe Autism";  
        }
    }
}
