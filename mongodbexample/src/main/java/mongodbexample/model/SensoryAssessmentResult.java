package mongodbexample.model;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Data
@Document(collection = "T_sensory_assess_result_details")
public class SensoryAssessmentResult {

    @Id
    private String id;
    private String childId;
    private List<SensoryResponse> responses;
    private LocalDateTime assessmentDate;

    public SensoryAssessmentResult() {
        this.assessmentDate = LocalDateTime.now();
    }

    @Data
    public static class SensoryResponse {
        private String subsecid;
        private String option;
		public String getSubsecid() {
			return subsecid;
		}
		public void setSubsecid(String subsecid) {
			this.subsecid = subsecid;
		}
		public String getOption() {
			return option;
		}
		public void setOption(String option) {
			this.option = option;
		}
        
        
    }

    // If you're not using Lombok's @Data annotation, keep these getters and setters:
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