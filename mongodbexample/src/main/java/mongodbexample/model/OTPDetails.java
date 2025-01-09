package mongodbexample.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "otp_details")
public class OTPDetails {
    @Id
    private String email;
    private String otp;
    private LocalDateTime otpResendTime;
    private LocalDateTime otpExpiryTime;
    private int otpMaxAttempt;
    private LocalDateTime otpLockingTime;
    
    public OTPDetails() {
    	
    }
	public OTPDetails(String email, String otp, LocalDateTime otpResendTime, LocalDateTime otpExpiryTime,
			int otpMaxAttempt, LocalDateTime otpLockingTime) {
		super();
		this.email = email;
		this.otp = otp;
		this.otpResendTime = otpResendTime;
		this.otpExpiryTime = otpExpiryTime;
		this.otpMaxAttempt = otpMaxAttempt;
		this.otpLockingTime = otpLockingTime;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public LocalDateTime getOtpResendTime() {
		return otpResendTime;
	}
	public void setOtpResendTime(LocalDateTime otpResendTime) {
		this.otpResendTime = otpResendTime;
	}
	public LocalDateTime getOtpExpiryTime() {
		return otpExpiryTime;
	}
	public void setOtpExpiryTime(LocalDateTime otpExpiryTime) {
		this.otpExpiryTime = otpExpiryTime;
	}
	public int getOtpMaxAttempt() {
		return otpMaxAttempt;
	}
	public void setOtpMaxAttempt(int otpMaxAttempt) {
		this.otpMaxAttempt = otpMaxAttempt;
	}
	public LocalDateTime getOtpLockingTime() {
		return otpLockingTime;
	}
	public void setOtpLockingTime(LocalDateTime otpLockingTime) {
		this.otpLockingTime = otpLockingTime;
	}
    
    
}