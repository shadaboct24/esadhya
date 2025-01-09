package mongodbexample.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mongodbexample.model.Country;
import mongodbexample.repository.CountryRepository;


@RestController
@CrossOrigin
public class CountryController {
	
	@Autowired
	private CountryRepository countryRepository;
	
	@GetMapping("/countries")
	public List<Country> getAllCountries(){
		return countryRepository.findAll();
	}
}
