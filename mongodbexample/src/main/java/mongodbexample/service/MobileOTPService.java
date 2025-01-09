package mongodbexample.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Random;
import javax.net.ssl.HttpsURLConnection;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import mongodbexample.model.OTPDetails;
import mongodbexample.repository.OTPRepository;

@Service
public class MobileOTPService {

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void generateAndSendMobileOTP(String phoneNumber) {
        // Fetch configuration
        Document config = mongoTemplate.getCollection("m_otp").find().first();
        if (config == null) {
            throw new RuntimeException("Configuration not found in the database");
        }
        
        int otpExpiryMinutes = config.getInteger("otp_expiry_time");
        int otpResendInterval = config.getInteger("otp_resend_time");

        // Check for existing OTP details
        OTPDetails otpDetails = otpRepository.findById(phoneNumber).orElse(new OTPDetails());
        
        // Resend logic
        if (otpDetails.getOtpResendTime() != null &&
                LocalDateTime.now().isBefore(otpDetails.getOtpResendTime().plusMinutes(otpResendInterval))) {
            throw new RuntimeException("Resend not allowed yet. Please wait.");
        }

        // Generate OTP
        int otpRef = new Random().nextInt(900000) + 100000;
        String otp = String.valueOf(otpRef);
        
        // Prepare OTP details
        otpDetails.setEmail(phoneNumber); // Using email field to store phone number
        otpDetails.setOtp(otp);
        otpDetails.setOtpResendTime(LocalDateTime.now());
        otpDetails.setOtpExpiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otpDetails.setOtpMaxAttempt(0);
        otpRepository.save(otpDetails);

        // Send SMS
        try {
            int statusCode = sendOtp(phoneNumber, Integer.parseInt(otp), otpRef);
            
            if (statusCode != 200) {
                throw new RuntimeException("Failed to send SMS. Status code: " + statusCode);
            }
        } catch (IOException e) {
            System.err.println("Error sending SMS: " + e.getMessage());
            throw new RuntimeException("Failed to send SMS: " + e.getMessage());
        }
    }

    public boolean validateMobileOTP(String phoneNumber, String otp) {
        // Fetch configuration
        Document config = mongoTemplate.getCollection("m_otp").find().first();
        if (config == null) {
            throw new RuntimeException("Configuration not found in the database");
        }
        
        int maxAttempts = config.getInteger("otp_max_attempt");
        int lockDuration = config.getInteger("otp_locking_time");

        // Find OTP details
        OTPDetails otpDetails = otpRepository.findById(phoneNumber)
                .orElseThrow(() -> new RuntimeException("Invalid phone number or OTP not generated"));

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

    // Existing sendOtp method remains the same as in your original code
    @SuppressWarnings("deprecation")
	public static int sendOtp(String phoneNumber, Integer otp, Integer otpRef) throws IOException {
        String FinalUrl = "";
        String ValMobile = phoneNumber;
        String ValMessage = "Dear MANAS your OTP for login is " + otp + " OTP reference " + otpRef + ".CDAC";

        try {
            String ValMessagePlus = URLEncoder.encode(ValMessage, "UTF-8");
            String ValUserName = "manas";
            String ValSender = "CDACBL";
            String SecureKey = "a31d01a1-e607-4d04-815e-93904e8a68f3";
            String url = "https://msdgweb.mgov.gov.in/esms/sendsmsrequestDLT";

            // Prepare hash
            String ValHash = ValUserName + ValSender + ValMessage + SecureKey;
            MessageDigest sha512 = MessageDigest.getInstance("SHA-512");
            byte[] hash = sha512.digest(ValHash.getBytes());

            StringBuilder hexHash = new StringBuilder();
            for (byte b : hash) {
                String hex = String.format("%02x", b);
                hexHash.append(hex);
            }
            ValHash = hexHash.toString();

            // Construct final URL
            FinalUrl = url + "?smsservicetype=singlemsg" +
                       "&content=" + ValMessagePlus +
                       "&mobileno=" + ValMobile +
                       "&senderid=" + ValSender +
                       "&key=" + ValHash +
                       "&username=" + ValUserName +
                       "&password=5d329d49c55a35635ed62d195827565d73f6b146" +
                       "&templateid=1007730312459274412";

            // Send POST request
			URL urls = new URL(FinalUrl);
            HttpsURLConnection con = (HttpsURLConnection) urls.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("User-Agent", "Mozilla/5.0");
            con.setRequestProperty("cache-control", "no-cache");
            
            return con.getResponseCode();

        } catch (UnsupportedEncodingException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            throw new RuntimeException("Error preparing SMS OTP: " + e.getMessage());
        }
    }
}