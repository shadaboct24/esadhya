package mongodbexample.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String fullName;
    private String username;
    private String password;
    private String gender;
    private String dob;
    private String role;
    private String occupation;
    private String email;
    @Override
	public String toString() {
		return "User [id=" + id + ", fullName=" + fullName + ", username=" + username + ", password=" + password
				+ ", gender=" + gender + ", dob=" + dob + ", role=" + role + ", occupation=" + occupation + ", email="
				+ email + ", contactNumber=" + contactNumber + ", schoolSelected=" + schoolSelected
				+ ", schoolRegNumber=" + schoolRegNumber + ", schoolPasscode=" + schoolPasscode + ", country=" + country
				+ ", state=" + state + ", district=" + district + ", belonging=" + belonging + ", cityOrMandal="
				+ cityOrMandal + ", street=" + street + ", houseNo=" + houseNo + ", address=" + address
				+ ", registrationdate=" + registrationdate + ", useractivestatus=" + useractivestatus + ", funcroleid="
				+ funcroleid + "]";
	}
	private String contactNumber;
    private String schoolSelected;
    private String schoolRegNumber;
    private String schoolPasscode;
    private String country;
    private String state;
    private String district;
    private String belonging;
    private String cityOrMandal;
    private String street;
    private String houseNo;
    private String address;
    
    //extra variables to add
    
    private LocalDateTime registrationdate;
    private Boolean useractivestatus;
    private String funcroleid;
    
    public User() {
    	
    	this.registrationdate=LocalDateTime.now();
    	this.useractivestatus=true;
    	this.funcroleid=null;
    	
    }
    
    //getter setter of extra fields
    public LocalDateTime getregistrationdate() {
    	return registrationdate;
    }
    public void setregistrationdate(LocalDateTime registrationdate) {
    	this.registrationdate=registrationdate;
    	
    }
    
    public Boolean getactivestatus() {
    	return useractivestatus;
    }
    
    public void setactivestatus(Boolean useractivestatus) {
    	this.useractivestatus=useractivestatus;
    }
    
    public String getfuncroleid() {
    	return funcroleid;
    }
    
    public void setfuncroleid(String funcroleid) {
    	this.funcroleid=funcroleid;
    }
    
    
    
    
    
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getSchoolSelected() {
		return schoolSelected;
	}
	public void setSchoolSelected(String schoolSelected) {
		this.schoolSelected = schoolSelected;
	}
	public String getSchoolRegNumber() {
		return schoolRegNumber;
	}
	public void setSchoolRegNumber(String schoolRegNumber) {
		this.schoolRegNumber = schoolRegNumber;
	}
	public String getSchoolPasscode() {
		return schoolPasscode;
	}
	public void setSchoolPasscode(String schoolPasscode) {
		this.schoolPasscode = schoolPasscode;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getBelonging() {
		return belonging;
	}
	public void setBelonging(String belonging) {
		this.belonging = belonging;
	}
	public String getCityOrMandal() {
		return cityOrMandal;
	}
	public void setCityOrMandal(String cityOrMandal) {
		this.cityOrMandal = cityOrMandal;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getHouseNo() {
		return houseNo;
	}
	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public User(String id, String fullName, String username, String password, String gender, String dob, String role,
			String occupation, String email, String contactNumber, String schoolSelected, String schoolRegNumber,
			String schoolPasscode, String country, String state, String district, String belonging, String cityOrMandal,
			String street, String houseNo, String address) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.username = username;
		this.password = password;
		this.gender = gender;
		this.dob = dob;
		this.role = role;
		this.occupation = occupation;
		this.email = email;
		this.contactNumber = contactNumber;
		this.schoolSelected = schoolSelected;
		this.schoolRegNumber = schoolRegNumber;
		this.schoolPasscode = schoolPasscode;
		this.country = country;
		this.state = state;
		this.district = district;
		this.belonging = belonging;
		this.cityOrMandal = cityOrMandal;
		this.street = street;
		this.houseNo = houseNo;
		this.address = address;
	}

}