package com.fitzone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitzone.backend.entity.Community;

public interface CommunityRepository extends JpaRepository<Community, Long>{
    
}
