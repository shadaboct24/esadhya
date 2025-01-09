package mongodbexample.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mongodbexample.model.Newschoolreg;
import mongodbexample.repository.NewschoolregRepository;

@Service
public class NewschoolregService {
	
	@Autowired
	private NewschoolregRepository newschoolregRepo;
	
	public Newschoolreg RegisterNewschool(Newschoolreg newschool) {
		
		newschool.setSchoolActivestatus(true);
		newschool.setDateofCreation(LocalDateTime.now());
		newschool.setDateofDeactivation(null);
		return newschoolregRepo.save(newschool);
	}
}
