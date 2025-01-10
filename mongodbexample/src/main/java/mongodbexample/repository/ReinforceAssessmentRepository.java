package mongodbexample.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import mongodbexample.model.ReinforceAssessment;
@Repository
public interface ReinforceAssessmentRepository extends MongoRepository<ReinforceAssessment,String> {
	
	List<ReinforceAssessment> findByChildId(String childId);

}
