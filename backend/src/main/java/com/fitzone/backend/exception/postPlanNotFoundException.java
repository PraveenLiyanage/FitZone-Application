package com.fitzone.backend.exception;




public class postPlanNotFoundException extends RuntimeException {
     public postPlanNotFoundException(Long id){
        super("Could not found the user with id"+id);
    }

  
}
