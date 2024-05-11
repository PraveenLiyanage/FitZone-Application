package com.fitzone.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fitzone.backend.entity.Post;
import com.fitzone.backend.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    private static final String UPLOAD_DIR = "FitZone-Application/frontend/src/assets/uploads";

    public String uploadPost(String publisherName, String location, String postTitle, MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        
        String fileExtension = FilenameUtils.getExtension(fileName);

        if (!Arrays.asList("jpg", "jpeg", "png").contains(fileExtension.toLowerCase())) {
            throw new IllegalArgumentException("Unsupported file format. Please upload a jpg, jpeg, or png file.");
        }
        
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        Post post = new Post();
        post.setPublisherName(publisherName);
        post.setLocation(location);
        post.setPostTitle(postTitle);
        post.setImagePath(fileName);

        try {
            postRepository.save(post);
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save post to database");
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    void deletePost(Long id){
        postRepository.deleteById(id);
    }

    public Optional<Post> getPostById(Long id){
        return postRepository.findById(id);
    }
    
    public void updatePost(Long id, String publisherName, String location, String postTitle, MultipartFile file) throws IOException {
        // Retrieve the existing post
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        
        // Update the post fields
        post.setPublisherName(publisherName);
        post.setLocation(location);
        post.setPostTitle(postTitle);
        
        // Handle file upload if provided
        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String filePath = UPLOAD_DIR + "/" + fileName;
            Files.copy(file.getInputStream(), Paths.get(filePath));
            post.setImagePath(fileName);
        }
        
        // Save the updated post
        postRepository.save(post);
    }
}
