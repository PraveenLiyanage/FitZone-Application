package com.fitzone.backend.repository;

import com.fitzone.backend.model.WorkoutModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface workoutRepository extends JpaRepository<WorkoutModel,Long>{


} 
