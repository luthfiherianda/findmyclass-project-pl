package com.rajakoding.FindMyClass.repository;

import com.rajakoding.FindMyClass.model.Kelas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KelasRepository extends JpaRepository<Kelas, Long> {
}
