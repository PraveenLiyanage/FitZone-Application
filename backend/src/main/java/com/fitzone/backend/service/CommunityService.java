package com.fitzone.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.fitzone.backend.entity.Community;
import com.fitzone.backend.repository.CommunityRepository;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;
    
    public List<Community> getAllCommunities(){
        return communityRepository.findAll();
    }

    public Optional<Community> getCommunityById(Long id){
        return communityRepository.findById(id);
    }

    Community createCommunity(Community community){
        return communityRepository.save(community);
    }

    public Community updateCommunity(Long id, Community community){
        return communityRepository.save(community);
    }

    void deleteCommunity(Long id){
        communityRepository.deleteById(id);
    }

}
