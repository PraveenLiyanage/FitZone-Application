package com.fitzone.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitzone.backend.exception.mealPlanNotFoundException;
import com.fitzone.backend.model.mealPlanModel;
import com.fitzone.backend.repository.mealPlanRepository;

@RestController
@RequestMapping("/api/mealplans")
public class mealPlanController {
    @Autowired
    private mealPlanRepository mealPlanRepository;
    @PostMapping("/meelplan")
    mealPlanModel newmeelModel(@RequestBody mealPlanModel newmeePlanModel){
        return mealPlanRepository.save(newmeePlanModel);
    }
    @GetMapping("/meelplan")
        List<mealPlanModel> getAllMeel(){
            return mealPlanRepository.findAll();
    }
    @GetMapping("/meelplan/{id}")
    mealPlanModel getmeelplanId(@PathVariable Long id){
        return mealPlanRepository.findById(id)
                .orElseThrow(()->new mealPlanNotFoundException(id));
    }
    @PutMapping("/meelplan/{id}")
    mealPlanModel updatemeelplan(@RequestBody mealPlanModel newMealPlanModel, @PathVariable Long id) {
        return mealPlanRepository.findById(id)
                .map(mealPlanModel -> {
                    mealPlanModel.setName(newMealPlanModel.getName());
                    mealPlanModel.setRecipe(newMealPlanModel.getRecipe());
                    mealPlanModel.setInfo(newMealPlanModel.getInfo());
                    mealPlanModel.setDate(newMealPlanModel.getDate());
                    mealPlanModel.setSize(newMealPlanModel.getSize());
                    mealPlanModel.setImgUrl(newMealPlanModel.getImgUrl());
                    return mealPlanRepository.save(mealPlanModel);
                }).orElseThrow(() -> new mealPlanNotFoundException(id));
    }

    @DeleteMapping("/meelplan/{id}")
    String deletemeelplan(@PathVariable Long id){
        if (!mealPlanRepository.existsById(id)){
            throw new mealPlanNotFoundException(id);
        }
        mealPlanRepository.deleteById(id);
        return "WorkoutPlan with id "+id+ " Deleted ";
    }
}
