package mongodbexample.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import mongodbexample.model.Newschoolreg;

@Repository
public interface NewschoolregRepository extends MongoRepository <Newschoolreg,String>{

	//login for school admin
	Newschoolreg findByUsernameAndPassword(String username,String password);
	
	Newschoolreg findByAdminEmail(String adminEmail);
}
