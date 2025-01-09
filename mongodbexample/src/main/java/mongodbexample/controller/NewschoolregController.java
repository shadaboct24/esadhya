package mongodbexample.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.model.Newschoolreg;
import mongodbexample.service.NewschoolregService;

@CrossOrigin
@RestController
public class NewschoolregController {
	
	@Autowired
	private NewschoolregService schoolService;
	
	@PostMapping("/registernewschool")
	public ResponseEntity<Newschoolreg> registerschool(@RequestBody Newschoolreg schoolreg){
		Newschoolreg schoolregistered=schoolService.RegisterNewschool(schoolreg);
		return ResponseEntity.ok(schoolregistered);
	}
}
