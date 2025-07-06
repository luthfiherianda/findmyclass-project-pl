package com.rajakoding.FindMyClass.repository;

import com.rajakoding.FindMyClass.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
}
