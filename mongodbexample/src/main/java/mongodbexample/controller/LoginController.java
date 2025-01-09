package mongodbexample.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.dto.LoginRequest;
import mongodbexample.model.Newschoolreg;
import mongodbexample.model.User;
import mongodbexample.service.LoginService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User authenticatedUser = loginService.validateUser(loginRequest.getUsername(), loginRequest.getPassword());
        Newschoolreg authenticatescl=loginService.validateSchool(loginRequest.getUsername(), loginRequest.getPassword());

        if (authenticatedUser != null) {
            // Return the user object to the frontend
            return ResponseEntity.ok(authenticatedUser);
        } 
        else if(authenticatescl!=null){
        	return ResponseEntity.ok(authenticatescl);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    
    //checking if email is exist in the system or not for forgot password
    @PostMapping("/checkemail")
    public Boolean CheckEmailExist(@RequestBody Map<String,String> request) {
    	String email=request.get("email");
    	System.out.println(email);
    	return loginService.validatemail(email);
    }
    
    @PutMapping("/forgotpassword")
    public Boolean forgotpassword(@RequestBody Map<String,String> request) {
    	String email=request.get("email");
    	String password=request.get("password");
    	return loginService.resetPassword(email,password);
    }
}