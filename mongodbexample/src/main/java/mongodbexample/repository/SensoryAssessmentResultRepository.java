package mongodbexample.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import mongodbexample.model.SensoryAssessmentResult;

public interface SensoryAssessmentResultRepository extends MongoRepository<SensoryAssessmentResult, String> {
    List<SensoryAssessmentResult> findByChildId(String childId);
}
