package com.fitzone.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fitzone.backend.model.mealPlanModel;

public interface mealPlanRepository extends JpaRepository<mealPlanModel,Long> {
    
}
