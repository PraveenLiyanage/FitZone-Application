package com.fitzone.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitzone.backend.entity.Comment;
import com.fitzone.backend.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> saveComment(@RequestBody Comment comment) {
        Comment savedComment = commentService.saveComment(comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        Optional<Comment> existingComment = commentService.getCommentById(id);
        if (existingComment.isPresent()) {
            comment.setId(id);
            Comment updatedComment = commentService.updateComment(comment);
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        Optional<Comment> existingComment = commentService.getCommentById(id);
        if (existingComment.isPresent()) {
            commentService.deleteComment(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
