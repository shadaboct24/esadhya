package mongodbexample.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "m_newschoolreg")
public class Newschoolreg {
	
	@Id 
	private String id;
	private String adminName;
	private String adminEmail;
	@Override
	public String toString() {
		return "Newschoolreg [id=" + id + ", adminName=" + adminName + ", adminEmail=" + adminEmail + ", username="
				+ username + ", password=" + password + ", adminPasscode=" + adminPasscode + ", adminContactNumber="
				+ adminContactNumber + ", schoolId=" + schoolId + ", schoolName=" + schoolName + ", schoolAdminId="
				+ schoolAdminId + ", schoolAddress=" + schoolAddress + ", schooldistrict=" + schooldistrict
				+ ", schoolState=" + schoolState + ", schoolCountry=" + schoolCountry + ", schoolCityOrMandal="
				+ schoolCityOrMandal + ", schoolRegNumber=" + schoolRegNumber + ", schoolpasscode=" + schoolpasscode
				+ ", schoolType=" + schoolType + ", schoolLandline=" + schoolLandline + ", schoolContactNumber="
				+ schoolContactNumber + ", schoolPincode=" + schoolPincode + ", schoolLogo=" + schoolLogo
				+ ", schoolStreet=" + schoolStreet + ", schoolBuildingNumber=" + schoolBuildingNumber
				+ ", schoolActivestatus=" + schoolActivestatus + ", dateofCreation=" + dateofCreation
				+ ", dateofDeactivation=" + dateofDeactivation + "]";
	}

	private String username;  
	private String password;
	private String adminPasscode;
	private String adminContactNumber;
	private String schoolId;
	private String schoolName;
	private String schoolAdminId;
	private String schoolAddress;
	private String schooldistrict;
	private String schoolState;
	private String schoolCountry;
	private String schoolCityOrMandal;
	private String schoolRegNumber;
	private String schoolpasscode;
	private String schoolType;
	private String schoolLandline;
	private String schoolContactNumber;
	private String schoolPincode;
	private String schoolLogo;
	private String schoolStreet;
	private String schoolBuildingNumber;
	
	
	//extra fields
	
	private Boolean schoolActivestatus;
	private LocalDateTime dateofCreation;
	private LocalDateTime dateofDeactivation;
	
	public Newschoolreg() {
		this.schoolActivestatus=true;
		this.dateofCreation=LocalDateTime.now();
		this.dateofDeactivation=null;
	}

	public Newschoolreg(String id, String adminName, String adminEmail, String username, String password,
			String adminPasscode, String adminContactNumber, String schoolId, String schoolName, String schoolAdminId,
			String schoolAddress, String schooldistrict, String schoolState, String schoolCountry,
			String schoolCityOrMandal, String schoolRegNumber, String schoolpasscode, String schoolType,
			String schoolLandline, String schoolContactNumber, String schoolPincode, String schoolLogo,
			String schoolStreet, String schoolBuildingNumber, Boolean schoolActivestatus, LocalDateTime dateofCreation,
			LocalDateTime dateofDeactivation) {
		super();
		this.id = id;
		this.adminName = adminName;
		this.adminEmail = adminEmail;
		this.username = username;
		this.password = password;
		this.adminPasscode = adminPasscode;
		this.adminContactNumber = adminContactNumber;
		this.schoolId = schoolId;
		this.schoolName = schoolName;
		this.schoolAdminId = schoolAdminId;
		this.schoolAddress = schoolAddress;
		this.schooldistrict = schooldistrict;
		this.schoolState = schoolState;
		this.schoolCountry = schoolCountry;
		this.schoolCityOrMandal = schoolCityOrMandal;
		this.schoolRegNumber = schoolRegNumber;
		this.schoolpasscode = schoolpasscode;
		this.schoolType = schoolType;
		this.schoolLandline = schoolLandline;
		this.schoolContactNumber = schoolContactNumber;
		this.schoolPincode = schoolPincode;
		this.schoolLogo = schoolLogo;
		this.schoolStreet = schoolStreet;
		this.schoolBuildingNumber = schoolBuildingNumber;
		this.schoolActivestatus = schoolActivestatus;
		this.dateofCreation = dateofCreation;
		this.dateofDeactivation = dateofDeactivation;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getAdminEmail() {
		return adminEmail;
	}

	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAdminPasscode() {
		return adminPasscode;
	}

	public void setAdminPasscode(String adminPasscode) {
		this.adminPasscode = adminPasscode;
	}

	public String getAdminContactNumber() {
		return adminContactNumber;
	}

	public void setAdminContactNumber(String adminContactNumber) {
		this.adminContactNumber = adminContactNumber;
	}

	public String getSchoolId() {
		return schoolId;
	}

	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getSchoolAdminId() {
		return schoolAdminId;
	}

	public void setSchoolAdminId(String schoolAdminId) {
		this.schoolAdminId = schoolAdminId;
	}

	public String getSchoolAddress() {
		return schoolAddress;
	}

	public void setSchoolAddress(String schoolAddress) {
		this.schoolAddress = schoolAddress;
	}

	public String getSchooldistrict() {
		return schooldistrict;
	}

	public void setSchooldistrict(String schooldistrict) {
		this.schooldistrict = schooldistrict;
	}

	public String getSchoolState() {
		return schoolState;
	}

	public void setSchoolState(String schoolState) {
		this.schoolState = schoolState;
	}

	public String getSchoolCountry() {
		return schoolCountry;
	}

	public void setSchoolCountry(String schoolCountry) {
		this.schoolCountry = schoolCountry;
	}

	public String getSchoolCityOrMandal() {
		return schoolCityOrMandal;
	}

	public void setSchoolCityOrMandal(String schoolCityOrMandal) {
		this.schoolCityOrMandal = schoolCityOrMandal;
	}

	public String getSchoolRegNumber() {
		return schoolRegNumber;
	}

	public void setSchoolRegNumber(String schoolRegNumber) {
		this.schoolRegNumber = schoolRegNumber;
	}

	public String getSchoolpasscode() {
		return schoolpasscode;
	}

	public void setSchoolpasscode(String schoolpasscode) {
		this.schoolpasscode = schoolpasscode;
	}

	public String getSchoolType() {
		return schoolType;
	}

	public void setSchoolType(String schoolType) {
		this.schoolType = schoolType;
	}

	public String getSchoolLandline() {
		return schoolLandline;
	}

	public void setSchoolLandline(String schoolLandline) {
		this.schoolLandline = schoolLandline;
	}

	public String getSchoolContactNumber() {
		return schoolContactNumber;
	}

	public void setSchoolContactNumber(String schoolContactNumber) {
		this.schoolContactNumber = schoolContactNumber;
	}

	public String getSchoolPincode() {
		return schoolPincode;
	}

	public void setSchoolPincode(String schoolPincode) {
		this.schoolPincode = schoolPincode;
	}

	public String getSchoolLogo() {
		return schoolLogo;
	}

	public void setSchoolLogo(String schoolLogo) {
		this.schoolLogo = schoolLogo;
	}

	public String getSchoolStreet() {
		return schoolStreet;
	}

	public void setSchoolStreet(String schoolStreet) {
		this.schoolStreet = schoolStreet;
	}

	public String getSchoolBuildingNumber() {
		return schoolBuildingNumber;
	}

	public void setSchoolBuildingNumber(String schoolBuildingNumber) {
		this.schoolBuildingNumber = schoolBuildingNumber;
	}

	public Boolean getSchoolActivestatus() {
		return schoolActivestatus;
	}

	public void setSchoolActivestatus(Boolean schoolActivestatus) {
		this.schoolActivestatus = schoolActivestatus;
	}

	public LocalDateTime getDateofCreation() {
		return dateofCreation;
	}

	public void setDateofCreation(LocalDateTime dateofCreation) {
		this.dateofCreation = dateofCreation;
	}

	public LocalDateTime getDateofDeactivation() {
		return dateofDeactivation;
	}

	public void setDateofDeactivation(LocalDateTime dateofDeactivation) {
		this.dateofDeactivation = dateofDeactivation;
	}
	

}
