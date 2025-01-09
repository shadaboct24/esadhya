package mongodbexample.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import mongodbexample.dto.AssessmentRequestDTO;
import mongodbexample.model.IsaaAssessment;
import mongodbexample.model.SensoryAssessmentResult.SensoryResponse;
import mongodbexample.repository.IsaaAssessmentRepository;

@Service
public class IsaaAssessmentService {
	
	@Autowired
	private IsaaAssessmentRepository isaarepository;
	
	public IsaaAssessment saveAssessment(IsaaAssessment request) {
		
//		Integer score=0;
		IsaaAssessment result= new IsaaAssessment();
		result.setChildId(request.getChildId());
		result.setResponses(request.getResponses());
			
		result.setScore(updateScore(request.getResponses()));	
		result.setRecommendation(request.getRecommendation());
		return isaarepository.save(result);
	}
	
	public List<IsaaAssessment> getAssessmentByChildId(String childId){
		return isaarepository.findByChildId(childId);
	}
	
	public Integer updateScore(List<SensoryResponse> list) {
		Integer score=0;
		
		for (SensoryResponse response : list) {
			Integer optionScore= getScoreForOption(response.getOption());
//			System.out.println(response.getOption());
			score+=optionScore;
		}
		return score;
	}
	private Integer getScoreForOption(String option) {
	    switch (option) {
	        case "rarely Upto 0-20%":
	            return 1;
	        case "sometimes 21-40%":
	            return 2;
	        case "frequently 41-60%":
	            return 3;
	        case "mostly 61-80%":
	            return 4;
	        case "always 81-100%":
	            return 5;
	        default:
	            return 0; // Default score for invalid options
	    }
	}

}


