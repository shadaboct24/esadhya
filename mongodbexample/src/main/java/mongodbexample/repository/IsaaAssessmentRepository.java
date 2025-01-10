package mongodbexample.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import mongodbexample.model.IsaaAssessment;

@Repository
public interface IsaaAssessmentRepository extends MongoRepository<IsaaAssessment,String> {

	List<IsaaAssessment> findByChildId(String childId);
}
