package mongodbexample.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.dto.AssessmentRequestDTO;
import mongodbexample.model.SensoryAssessmentResult;
import mongodbexample.service.SensoryAssessmentResultService;

@RestController
@RequestMapping("/api/sensory-assessment")
@CrossOrigin(origins = "*") // Configure according to your security requirements
public class SensoryAssessmentResultController {
    
    @Autowired
    private SensoryAssessmentResultService service;
    
    @PostMapping("/submit")
    public ResponseEntity<SensoryAssessmentResult> submitAssessment(@RequestBody AssessmentRequestDTO requestDTO) {
        try {
            SensoryAssessmentResult result = service.saveAssessment(requestDTO);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/child/{childId}")
    public ResponseEntity<List<SensoryAssessmentResult>> getAssessmentsByChild(@PathVariable String childId) {
        try {
            List<SensoryAssessmentResult> results = service.getAssessmentsByChildId(childId);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<SensoryAssessmentResult>> getAllAssessments() {
        try {
            List<SensoryAssessmentResult> results = service.getAllAssessments();
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
