package mongodbexample.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import mongodbexample.model.SensoryScreeningAssessment;

@Repository
public interface SensoryScreeningAssessmentRepository extends MongoRepository<SensoryScreeningAssessment, String> {
	
    List<SensoryScreeningAssessment> findByAssesstypeid(String assesstypeid);
}
