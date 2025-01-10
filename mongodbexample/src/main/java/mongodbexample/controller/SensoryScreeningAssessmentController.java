package mongodbexample.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.model.SensoryAssessmentResult;
import mongodbexample.model.SensoryScreeningAssessment;
import mongodbexample.model.SensoryScreeningAssessment.Subsection;
import mongodbexample.repository.*;
@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*")
public class SensoryScreeningAssessmentController {
    
    @Autowired
    private SensoryScreeningAssessmentRepository assessmentRepository;
    
    //this method is used for fetching all assessment question does not depend on type of assess
    @GetMapping("/type/{assesstypeid}")
    public ResponseEntity<Map<String, List<Subsection>>> getAssessmentsByType(@PathVariable String assesstypeid) {
        List<SensoryScreeningAssessment> assessments = assessmentRepository.findByAssesstypeid(assesstypeid);
        
        // Transform the data into the desired format
        Map<String, List<Subsection>> formattedData = new LinkedHashMap<>();
        
        for (SensoryScreeningAssessment assessment : assessments) {
        	//System.out.println(assessment.toString());
            formattedData.put(
                assessment.getSectionname(),
                assessment.getSubsection_details()
            );
        }
//        System.out.println("hello");
        return ResponseEntity.ok(formattedData);
    }
    
    // for updating the details 
    
    @Autowired
    private SensoryAssessmentResultRepository resultRepository;
    

 // Get both questions and responses for a child
    @GetMapping("/existing-sensoryassessment/{childId}")
    public ResponseEntity<Map<String, Object>> getExistingAssessment(@PathVariable String childId) {
        try {
            // Get the questions first
            List<SensoryScreeningAssessment> assessments = assessmentRepository.findByAssesstypeid("ASSESSTYPE_9");
            Map<String, List<Subsection>> questions = new LinkedHashMap<>();
            
            for (SensoryScreeningAssessment assessment : assessments) {
                questions.put(
                    assessment.getSectionname(),
                    assessment.getSubsection_details()
                );
            }
            
            // Get existing responses
            List<SensoryAssessmentResult> existingResults = resultRepository.findByChildId(childId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("questions", questions);
            response.put("responses", !existingResults.isEmpty() ? existingResults.get(0) : null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/updatesensoryassessment/{childId}")
    public ResponseEntity<?> updateAssessment(@PathVariable String childId, @RequestBody SensoryAssessmentResult updatedResult) {
        try {
            // Find existing assessment
            List<SensoryAssessmentResult> existingResults = resultRepository.findByChildId(childId);
            if (existingResults.isEmpty()) {
                throw new RuntimeException("Assessment not found");
            }
            
            // Get the first (and should be only) result
            SensoryAssessmentResult existingResult = existingResults.get(0);

            // Update the responses
            existingResult.setResponses(updatedResult.getResponses());
            existingResult.setAssessmentDate(LocalDateTime.now());

            // Save updated assessment
            resultRepository.save(existingResult);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating assessment: " + e.getMessage());
        }
    }
}
