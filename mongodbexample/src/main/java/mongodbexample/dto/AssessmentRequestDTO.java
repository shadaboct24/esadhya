package mongodbexample.dto;

import java.util.List;

import mongodbexample.model.SensoryAssessmentResult.SensoryResponse;

import lombok.Data;
// currently using this for sensory assessment but can be used for all assessment that why namig is different
@Data
public class AssessmentRequestDTO {
	private String childId;
    private List<SensoryResponse> responses;
    
    
	public String getChildId() {
		return childId;
	}
	public void setChildId(String childId) {
		this.childId = childId;
	}
	public List<SensoryResponse> getResponses() {
		return responses;
	}
	public void setResponses(List<SensoryResponse> responses) {
		this.responses = responses;
	}
    
}
