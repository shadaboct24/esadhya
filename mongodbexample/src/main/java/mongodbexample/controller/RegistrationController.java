package mongodbexample.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.model.User;
import mongodbexample.service.RegistrationService;

@CrossOrigin
@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;
    
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }

    @PostMapping("/registeruser")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = registrationService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
    
    @GetMapping("/registeruser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = registrationService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
//    @GetMapping("/users")
//    public List<User> getAllUser() {
//        List<User> user = registrationService.getAllUser();
//        return user;
//    }
    
}
