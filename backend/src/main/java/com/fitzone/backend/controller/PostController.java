package com.fitzone.backend.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fitzone.backend.entity.Post;
import com.fitzone.backend.repository.PostRepository;
import com.fitzone.backend.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Value("${image.upload.directory}")
    private String uploadDirectory;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadPost(@RequestParam("publisherName") String publisherName,
                                             @RequestParam("location") String location,
                                             @RequestParam("postTitle") String postTitle,
                                             @RequestParam("file") MultipartFile file) {
        try {
            String fileName = postService.uploadPost(publisherName, location, postTitle, file);
            return ResponseEntity.ok("Post uploaded successfully! Filename: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload post: " + e.getMessage());
        }
    }

    @GetMapping("/uploads/{imageName:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(uploadDirectory).resolve(imageName).normalize();
            Resource resource = new UrlResource(imagePath.toUri());
            
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
@DeleteMapping("/{id}")
public ResponseEntity<String> deletePost(@PathVariable Long id) {
    try {
        postRepository.deleteById(id);
        return ResponseEntity.ok("Post deleted successfully!");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete post: " + e.getMessage());
    }
}

@GetMapping("{id}")
public ResponseEntity<Post> getPost(@PathVariable Long id) {
    Post post = postRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    return ResponseEntity.ok().body(post);
}

@PutMapping("/{id}")
public ResponseEntity<String> updatePost(
    @PathVariable Long id,
    @RequestParam("publisherName") String publisherName,
    @RequestParam("location") String location,
    @RequestParam("postTitle") String postTitle,
    @RequestParam("file") MultipartFile file
) {
    try {
        postService.updatePost(id, publisherName, location, postTitle, file);
        return ResponseEntity.ok("Post updated successfully!");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update post: " + e.getMessage());
    }
}


}

