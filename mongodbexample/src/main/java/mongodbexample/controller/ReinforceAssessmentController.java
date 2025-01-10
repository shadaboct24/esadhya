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

import mongodbexample.model.ReinforceAssessment;
import mongodbexample.service.ReinforceAssessmentService;

@RestController
@RequestMapping("/api/reinforce-assessments")
@CrossOrigin(origins = "*")
public class ReinforceAssessmentController {
	
	@Autowired
	private ReinforceAssessmentService reinforceService;
	
	@PostMapping("/submit")
	public ResponseEntity<ReinforceAssessment> submitAssessment(@RequestBody ReinforceAssessment assessment){
		
		try {
			ReinforceAssessment result= reinforceService.saveAssessment(assessment);
			return ResponseEntity.ok(result);
		}catch(Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping("/child/{childId}")
	public ResponseEntity<List<ReinforceAssessment>> findByChildId(@PathVariable String childId){
		try {
			List<ReinforceAssessment> result= reinforceService.findByChildId(childId);
			return ResponseEntity.ok(result);
		} catch(Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}
}
