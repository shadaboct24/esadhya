package mongodbexample.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mongodbexample.model.User;
import mongodbexample.repository.UserRepository;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
    	user.setregistrationdate(LocalDateTime.now());
    	user.setactivestatus(true);
    	user.setfuncroleid("null");
        return userRepository.save(user);
    }
    
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
    
//    public List<User> getAllUser() {
//        return userRepository.findAll();
//    }
}