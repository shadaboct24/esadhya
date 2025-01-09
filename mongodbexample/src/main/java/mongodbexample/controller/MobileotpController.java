package mongodbexample.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.service.MobileOTPService;

@RestController
@CrossOrigin
public class MobileotpController {

    @Autowired
    private MobileOTPService mobileOTPService;

    @PostMapping("/sendmobileotp")
    public ResponseEntity<?> generateMobileOTP(@RequestBody Map<String, String> request) {
        String phoneNumber=request.get("phoneNumber");
    	try {
            // Validate phone number (basic check)
            if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Phone number is required");
            }

            mobileOTPService.generateAndSendMobileOTP(phoneNumber);
            return ResponseEntity.ok(true);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/mobileotpvalidate")
    public ResponseEntity<?> validateMobileOTP(@RequestBody Map<String,String> request) {
        
    	String phoneNumber=request.get("phoneNumber");
    	String otp= request.get("otp");
    	try {
            // Validate input
            if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Phone number is required");
            }
            if (otp == null || otp.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("OTP is required");
            }

            boolean isValid = mobileOTPService.validateMobileOTP(phoneNumber, otp);
            return ResponseEntity.ok(isValid);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}