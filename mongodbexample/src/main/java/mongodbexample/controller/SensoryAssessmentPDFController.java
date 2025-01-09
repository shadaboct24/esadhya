package mongodbexample.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.service.SensoryAssessmentPDFGenerationService;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "*")
public class SensoryAssessmentPDFController {
    
    @Autowired
    private SensoryAssessmentPDFGenerationService pdfService;
    
    @GetMapping("/generate/{childId}")
    public ResponseEntity<byte[]> generatePDF(
            @PathVariable String childId,
            @RequestParam String childName) {
        try {
            byte[] pdfBytes = pdfService.generateAssessmentReport(childId, childName);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "assessment-report.pdf");
            
            return ResponseEntity
                .ok()
                .headers(headers)
                .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
