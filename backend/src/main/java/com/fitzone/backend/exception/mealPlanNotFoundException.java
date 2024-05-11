package com.fitzone.backend.exception;

public class mealPlanNotFoundException extends RuntimeException{
    public mealPlanNotFoundException(Long id){
        super("Could not found the user with id"+id);
    }
}
