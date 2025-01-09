package mongodbexample.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import mongodbexample.model.OTPDetails;
import mongodbexample.repository.OTPRepository;

@Service
public class OTPService {
    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MongoTemplate mongoTemplate;

    //private static final String CONFIG_COLLECTION = "m_otp";

    public void generateAndSendOTP(String email) {
        // Fetch configuration
    	Document config = mongoTemplate.getCollection("m_otp").find().first();
    	if (config == null) {
            throw new RuntimeException("Configuration not found in the database");
        }
    	
    	int otpExpiryMinutes = config.getInteger("otp_expiry_time");
        int otpResendInterval = config.getInteger("otp_resend_time");

        OTPDetails otpDetails = otpRepository.findById(email).orElse(new OTPDetails());
        
        // Resend logic
        if (otpDetails.getOtpResendTime() != null &&
                LocalDateTime.now().isBefore(otpDetails.getOtpResendTime().plusMinutes(otpResendInterval))) {
            throw new RuntimeException("Resend not allowed yet. Please wait.");
        }

        // Generate OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpDetails.setEmail(email);
        otpDetails.setOtp(otp);
        otpDetails.setOtpResendTime(LocalDateTime.now());
        otpDetails.setOtpExpiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes)); 
        otpDetails.setOtpMaxAttempt(0);
        otpRepository.save(otpDetails);

        // Send email
        try {
        	sendEmail(email, otp);
        }catch (MailException e) {
  
        	System.err.println("Error sending email: " + e.getMessage());
        	throw new RuntimeException("Failed to send email. The provided email address may not exist or is incorrect: " + email);
        } catch (Exception e) {
        	// Catch any unexpected errors during email sending
        	System.err.println("Unexpected error: " + e.getMessage());
        	throw new RuntimeException("An unexpected error occurred while sending the email.");
        }
        	//        return "OTP sent successfully.";
    }

    public boolean validateOTP(String email, String otp) {
        // Fetch configuration
    	System.out.println("email is "+ email+"otp is"+otp);
    	Document config = mongoTemplate.getCollection("m_otp").find().first();
    	if (config == null) {
            throw new RuntimeException("Configuration not found in the database");
        }
    	int maxAttempts = config.getInteger("otp_max_attempt");
        int lockDuration = config.getInteger("otp_locking_time");

        OTPDetails otpDetails = otpRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or OTP not generated"));

        // Check lock status
        if (otpDetails.getOtpLockingTime() != null &&
                LocalDateTime.now().isBefore(otpDetails.getOtpLockingTime())) {
            throw new RuntimeException("Account is locked. Please try again later.");
        }

        // Check OTP validity
        if (!otp.equals(otpDetails.getOtp()) ||
                LocalDateTime.now().isAfter(otpDetails.getOtpExpiryTime())) {
            // Increment max attempt counter
            otpDetails.setOtpMaxAttempt(otpDetails.getOtpMaxAttempt() + 1);

            // Lock the account if attempts exceed max allowed
            if (otpDetails.getOtpMaxAttempt() >= maxAttempts) {
                otpDetails.setOtpLockingTime(LocalDateTime.now().plusMinutes(lockDuration));
            }

            otpRepository.save(otpDetails);
            throw new RuntimeException("Invalid OTP.");
        }

        // OTP is valid, delete the OTP details
        otpRepository.delete(otpDetails);
        return true;
    }

    private void sendEmail(String email, String otp) {

    	SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is " + otp + ". It is valid for 4 minutes.");
        mailSender.send(message);
        
    }
}

