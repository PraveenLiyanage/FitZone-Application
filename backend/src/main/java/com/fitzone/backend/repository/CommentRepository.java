package com.fitzone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitzone.backend.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    
}
