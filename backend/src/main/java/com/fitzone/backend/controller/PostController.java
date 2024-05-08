package com.fitzone.backend.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.AbstractFileResolvingResource;
import org.springframework.core.io.AbstractResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fitzone.backend.entity.Post;
import com.fitzone.backend.repository.PostRepository;
import com.fitzone.backend.service.PostService;

import jakarta.annotation.Resource;


@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;
    @Value("${image.upload.directory}")
    private String uploadDirectory;

    @Autowired
    private PostRepository postRepository;

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
            postService.uploadPost(publisherName, location, postTitle, file);
            return ResponseEntity.ok("Post uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload post: " + e.getMessage());
        }
    }
    // Add method to handle image retrieval
    @GetMapping("/images/{imageName:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(uploadDirectory).resolve(imageName).normalize();
            Resource resource = (Resource) new UrlResource(imagePath.toUri());
            
            if (((AbstractFileResolvingResource) resource).exists() || ((AbstractFileResolvingResource) resource).isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + ((AbstractResource) resource).getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}