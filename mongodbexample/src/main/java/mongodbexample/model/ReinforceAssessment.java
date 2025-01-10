package mongodbexample.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import mongodbexample.model.SensoryAssessmentResult.SensoryResponse;

@Data
@Document(collection="T_reinforce_assess_details")
public class ReinforceAssessment {
	
	@Id
	private String id;
	private String childId;
	private List<SensoryResponse> response;
	private LocalDateTime assessmentdate;
	
	public ReinforceAssessment() {
		this.assessmentdate=LocalDateTime.now();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getChildId() {
		return childId;
	}

	public void setChildId(String childId) {
		this.childId = childId;
	}

	public List<SensoryResponse> getResponse() {
		return response;
	}

	public void setResponse(List<SensoryResponse> response) {
		this.response = response;
	}

	public LocalDateTime getAssessmentdate() {
		return assessmentdate;
	}

	public void setAssessmentdate(LocalDateTime assessmentdate) {
		this.assessmentdate = assessmentdate;
	}
	
}
