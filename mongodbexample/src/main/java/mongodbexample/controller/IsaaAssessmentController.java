package mongodbexample.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.model.IsaaAssessment;
import mongodbexample.model.SensoryScreeningAssessment;
import mongodbexample.model.SensoryScreeningAssessment.Subsection;
import mongodbexample.repository.IsaaAssessmentRepository;
import mongodbexample.repository.SensoryScreeningAssessmentRepository;
import mongodbexample.service.IsaaAssessmentPDFGenerationService;
import mongodbexample.service.IsaaAssessmentService;

@RestController
@RequestMapping("/api/isaa-assessment")
@CrossOrigin(origins="*")
public class IsaaAssessmentController {
	
	@Autowired
	private IsaaAssessmentService isaaService;
	@Autowired
    private SensoryScreeningAssessmentRepository assessmentRepository;
	@Autowired
	private IsaaAssessmentRepository isaaRepository;
	
	//submitting assessment first time
	@PostMapping("/submit")
	public ResponseEntity<IsaaAssessment> submitAssessment(@RequestBody IsaaAssessment requestDTO){
		try {
			IsaaAssessment result = isaaService.saveAssessment(requestDTO);
			return ResponseEntity.ok(result);
		}catch(Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}
	
	// checking if student have already done assessment
	@GetMapping("/child/{childId}")
	public ResponseEntity<List<IsaaAssessment>> getAssessmentByChildId(@PathVariable String childId){
		try {
			List<IsaaAssessment> result= isaaService.getAssessmentByChildId(childId);
			return ResponseEntity.ok(result);
		} catch(Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}
	
	//fetching questions and options both
	@GetMapping("/existing-isaaAssessment/{childId}")
	public ResponseEntity<Map<String,Object>> getExistingAssessment(@PathVariable String childId){
		try {
			List<SensoryScreeningAssessment> assessments=assessmentRepository.findByAssesstypeid("ASSESSTYPE_1");
			Map<String, List<Subsection>> questions = new LinkedHashMap<>();
			
			for (SensoryScreeningAssessment assessment : assessments) {
                questions.put(
                    assessment.getSectionname(),
                    assessment.getSubsection_details()
                );
            }
			
			List<IsaaAssessment> existingResults= isaaRepository.findByChildId(childId);
			
			Map<String , Object > response = new HashMap<>();
			response.put("questions", questions);
            response.put("responses", !existingResults.isEmpty() ? existingResults.get(0) : null);
            response.put("recommendation", existingResults.get(0).getRecommendation());
            return ResponseEntity.ok(response);
		}catch(Exception e ) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
		}
	}
	//
	@PostMapping("/updateIsaaAssessment/{childId}")
	public ResponseEntity<?> updateAssessment(@PathVariable String childId,@RequestBody IsaaAssessment updatedResult){
		try {
			List<IsaaAssessment> existingresults=isaaRepository.findByChildId(childId);
			if(existingresults.isEmpty()) {
				throw new RuntimeException("Assessment not found");
			}
			
			IsaaAssessment existingresult=existingresults.get(0);
			
			existingresult.setResponses(updatedResult.getResponses());
			existingresult.setAssessmentDate(LocalDateTime.now());
			existingresult.setScore(isaaService.updateScore(updatedResult.getResponses()));
			existingresult.setRecommendation(updatedResult.getRecommendation());
			isaaRepository.save(existingresult);
			return ResponseEntity.ok().build();
			
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating assessment: "+e.getMessage());
		}
	}
	
	@Autowired
    private IsaaAssessmentPDFGenerationService pdfService;
	
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
