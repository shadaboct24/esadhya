package mongodbexample.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mongodbexample.model.ReinforceAssessment;
import mongodbexample.repository.ReinforceAssessmentRepository;

@Service
public class ReinforceAssessmentService {
	
	@Autowired
	private ReinforceAssessmentRepository reinforceRepository;
	
	public ReinforceAssessment saveAssessment(ReinforceAssessment assessment) {
		
		ReinforceAssessment response= new ReinforceAssessment();
		response.setChildId(assessment.getChildId());
		response.setResponse(assessment.getResponse());
		response.setAssessmentdate(LocalDateTime.now());
		
		return reinforceRepository.save(response);
	}
	
	public List<ReinforceAssessment> findByChildId(String childId){
		return reinforceRepository.findByChildId(childId);
	}
}
