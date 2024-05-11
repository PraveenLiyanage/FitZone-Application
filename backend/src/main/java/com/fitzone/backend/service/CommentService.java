package com.fitzone.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitzone.backend.entity.Comment;
import com.fitzone.backend.repository.CommentRepository;

@Service
public class CommentService {
     @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment updateComment(Comment updatedComment) {
        return commentRepository.save(updatedComment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
