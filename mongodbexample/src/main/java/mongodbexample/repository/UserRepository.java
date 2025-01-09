package mongodbexample.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import mongodbexample.model.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	User findByUsernameAndPassword(String username, String password);
	
	User findByEmail(String email);
}