package com.rajakoding.FindMyClass.repository;

import com.rajakoding.FindMyClass.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
