package mongodbexample.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.service.OTPService;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin
public class OTPController {
    @Autowired
    private OTPService otpService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateOTP(@RequestBody Map<String, String> request) {
        try {
    	String email = request.get("email");
        otpService.generateAndSendOTP(email);
   
        return ResponseEntity.ok(true);
        } catch(Exception e) {
        	return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateOTP(@RequestBody Map<String, String> request) {
        
    	try {
    	String email = request.get("email");
        String otp = request.get("otp");
        boolean isValid = otpService.validateOTP(email, otp);
        return ResponseEntity.ok(isValid);
    	} catch(Exception e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
}

