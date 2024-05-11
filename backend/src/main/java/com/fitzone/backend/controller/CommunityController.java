// package com.fitzone.backend.controller;
package com.fitzone.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.fitzone.backend.entity.Community;
import com.fitzone.backend.repository.CommunityRepository;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {

    @Autowired
    private CommunityRepository communityRepository;

    @GetMapping
    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Community createCommunity(@RequestBody Community community) {
        return communityRepository.save(community);
    }

    @GetMapping("/{id}")
    public Community getCommunity(@PathVariable Long id) {
        return communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community post not found with id: " + id));
    }

    @PutMapping("/{id}")
    public Community updateCommunity(@PathVariable Long id, @RequestBody Community community) {
        if (!communityRepository.existsById(id)) {
            throw new RuntimeException("Community post not found with id: " + id);
        }
        community.setId(id);
        return communityRepository.save(community);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCommunity(@PathVariable Long id) {
        communityRepository.deleteById(id);
    }
   
}