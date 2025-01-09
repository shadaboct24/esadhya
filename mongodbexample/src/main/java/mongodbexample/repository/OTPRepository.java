package mongodbexample.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import mongodbexample.model.OTPDetails;

@Repository
public interface OTPRepository extends MongoRepository<OTPDetails, String> {
}
