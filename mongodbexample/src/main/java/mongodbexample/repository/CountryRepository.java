package mongodbexample.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import mongodbexample.model.Country;

@Repository
public interface CountryRepository extends MongoRepository<Country,String> {

}
