package mongodbexample.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import mongodbexample.model.IsaaAssessment;

public interface IsaaAssessmentRepository extends MongoRepository<IsaaAssessment,String> {

	List<IsaaAssessment> findByChildId(String childId);
}
