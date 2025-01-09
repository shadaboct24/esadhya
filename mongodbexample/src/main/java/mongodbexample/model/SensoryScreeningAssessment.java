package mongodbexample.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="M_FacpAssessDetails")
public class SensoryScreeningAssessment {
	@Id
	private String id;
	private String assesstypeid;
	private String groupId;
	private String sectionid;
	private String sectionname;
	private List<Subsection> subsection_details;
	
	
	public class Subsection{
		private String subsecid;
		private String subsecname;
		public String getSubsecid() {
			return subsecid;
		}
		public void setSubsecid(String subsecid) {
			this.subsecid = subsecid;
		}
		public String getSubsecname() {
			return subsecname;
		}
		public void setSubsecname(String subsecname) {
			this.subsecname = subsecname;
		}
		public Subsection(String subsecid, String subsecname) {
			super();
			this.subsecid = subsecid;
			this.subsecname = subsecname;
		}
		@Override
		public String toString() {
			return "Subsection [subsecid=" + subsecid + ", subsecname=" + subsecname + "]";
		}
		
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getAssesstypeid() {
		return assesstypeid;
	}


	public void setAssesstypeid(String assesstypeid) {
		this.assesstypeid = assesstypeid;
	}


	public String getGroupId() {
		return groupId;
	}


	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}


	public String getSectionid() {
		return sectionid;
	}


	public void setSectionid(String sectionid) {
		this.sectionid = sectionid;
	}


	public String getSectionname() {
		return sectionname;
	}


	public void setSectionname(String sectionname) {
		this.sectionname = sectionname;
	}


	public List<Subsection> getSubsection_details() {
		return subsection_details;
	}


	public void setSubsection_details(List<Subsection> subsection_details) {
		this.subsection_details = subsection_details;
	}


	public SensoryScreeningAssessment(String id, String assesstypeid, String groupId, String sectionid,
			String sectionname, List<Subsection> subsection_details) {
		super();
		this.id = id;
		this.assesstypeid = assesstypeid;
		this.groupId = groupId;
		this.sectionid = sectionid;
		this.sectionname = sectionname;
		this.subsection_details = subsection_details;
	}


	@Override
	public String toString() {
		return "SensoryScreeningAssessment [id=" + id + ", assesstypeid=" + assesstypeid + ", groupId=" + groupId
				+ ", sectionid=" + sectionid + ", sectionname=" + sectionname + ", subsection_details="
				+ subsection_details + "]";
	}
	
	
}


