package mongodbexample.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mongodbexample.dto.AssessmentRequestDTO;
import mongodbexample.model.SensoryAssessmentResult;
import mongodbexample.repository.SensoryAssessmentResultRepository;

@Service
public class SensoryAssessmentResultService {
    
    @Autowired
    private SensoryAssessmentResultRepository repository;
    
    public SensoryAssessmentResult saveAssessment(AssessmentRequestDTO requestDTO) {
        SensoryAssessmentResult result = new SensoryAssessmentResult();
        result.setChildId(requestDTO.getChildId());
        result.setResponses(requestDTO.getResponses());
        return repository.save(result);
    }
    
    public List<SensoryAssessmentResult> getAssessmentsByChildId(String childId) {
        return repository.findByChildId(childId);
    }
    
    public List<SensoryAssessmentResult> getAllAssessments() {
        return repository.findAll();
    }
}
