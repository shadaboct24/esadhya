package mongodbexample.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import mongodbexample.model.SensoryAssessmentResult.SensoryResponse;

@Data
@Document (collection="T_isaa_assess_result_details")
public class IsaaAssessment {
	@Id
	private String id;
	private String childId;
	private List<SensoryResponse> responses;
	private Integer score;
	private String recommendation;
	private LocalDateTime assessmentDate;
	
	public IsaaAssessment() {
		this.assessmentDate=LocalDateTime.now();
	}
	
//	@Data
//	public static class QuestionResponse{
//		private String subsecid;
//		private String option;
//		
//		public String getSubsecid() {
//			return subsecid;
//		}
//		public void setSubsecid(String subsecid) {
//			this.subsecid = subsecid;
//		}
//		public String getOption() {
//			return option;
//		}
//		public void setOption(String option) {
//			this.option = option;
//		}
//	}
	

	public String getRecommendation() {
		return recommendation;
	}

	public void setRecommendation(String recommendation) {
		this.recommendation = recommendation;
	}
	
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
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

    public List<SensoryResponse> getResponses() {
        return responses;
    }

    public void setResponses(List<SensoryResponse> responses) {
        this.responses = responses;
    }

    public LocalDateTime getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(LocalDateTime assessmentDate) {
        this.assessmentDate = assessmentDate;
    }
}
