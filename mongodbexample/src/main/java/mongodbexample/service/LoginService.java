package mongodbexample.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mongodbexample.model.Newschoolreg;
import mongodbexample.model.User;
import mongodbexample.repository.NewschoolregRepository;
import mongodbexample.repository.UserRepository;

@Service
public class LoginService {
	
	@Autowired
    private UserRepository userRepository;
	@Autowired
	private NewschoolregRepository newsclrepo;
	@Autowired
	private OTPService otpService; // to send direct email otp if email is present for forgot password

    public User validateUser(String username, String password) {
        // Find the user by username and password
        return userRepository.findByUsernameAndPassword(username, password);
    }
    
    public Newschoolreg validateSchool(String username, String password) {
    	return newsclrepo.findByUsernameAndPassword(username, password);
    }
    
    // forgot password 
    public Boolean validatemail(String email) {
    	
    	User authenticatedUser = userRepository.findByEmail(email);
        Newschoolreg authenticatedscl=newsclrepo.findByAdminEmail(email);
        
        if(authenticatedUser!=null) {
        	otpService.generateAndSendOTP(email);
        	return true;
        }
        else if(authenticatedscl!=null) {
        	otpService.generateAndSendOTP(email);
        	return true;
        	}
        else 
        	return false;
    }
    
    public Boolean resetPassword(String email, String password) {
    	
    	User authenticatedUser = userRepository.findByEmail(email);
    	if(authenticatedUser!=null) {
    		System.out.println("saving user password");
    		authenticatedUser.setPassword(password);
    		userRepository.save(authenticatedUser);
    		return true;
    	}
    	
        Newschoolreg authenticatedscl=newsclrepo.findByAdminEmail(email);
        if(authenticatedscl!=null) {
        	System.out.println("saving scl password");
        	authenticatedscl.setPassword(password);
        	newsclrepo.save(authenticatedscl);
        	return true;
        }
        return false;
    }
    	
}
