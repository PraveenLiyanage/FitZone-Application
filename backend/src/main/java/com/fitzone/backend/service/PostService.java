package com.fitzone.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
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

    // Change the UPLOAD_DIR to be relative to the frontend project
    private static final String UPLOAD_DIR = "FitZone-Application/frontend/src/assets/uploads";

    public void uploadPost(String publisherName, String location, String postTitle, MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        
        // Get the file extension
        String fileExtension = FilenameUtils.getExtension(fileName);

        // Check if the file extension is supported
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
        
        // Set the image path to the file path
        post.setImagePath(filePath.toString());

        try {
            postRepository.save(post);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save post to database");
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}