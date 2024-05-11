package com.fitzone.backend.controller;

import com.fitzone.backend.exception.WorkoutNotFoundException;
import com.fitzone.backend.model.WorkoutModel;
import com.fitzone.backend.repository.workoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class workoutController {
    @Autowired
    private workoutRepository workoutRepository;

    @PostMapping("/workout")
    public WorkoutModel newWorkout(@RequestBody WorkoutModel newWorkout) {
        return workoutRepository.save(newWorkout);
    }

    @GetMapping("/workout")
    public List<WorkoutModel> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    @GetMapping("/workout/{id}")
    public WorkoutModel getWorkoutById(@PathVariable Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new WorkoutNotFoundException(id));
    }

    @PutMapping("/workout/{id}")
    public WorkoutModel updateWorkout(@RequestBody WorkoutModel updatedWorkout, @PathVariable Long id) {
        return workoutRepository.findById(id)
                .map(workout -> {
                    workout.setDate(updatedWorkout.getDate());
                    workout.setRun(updatedWorkout.getRun());
                    workout.setPushups(updatedWorkout.getPushups());
                    workout.setDescription(updatedWorkout.getDescription());
                    workout.setLifted(updatedWorkout.getLifted());
                    return workoutRepository.save(workout);
                })
                .orElseThrow(() -> new WorkoutNotFoundException(id));
    }

    @DeleteMapping("/workout/{id}")
    public String deleteWorkout(@PathVariable Long id) {
        if (!workoutRepository.existsById(id)) {
            throw new WorkoutNotFoundException(id);
        }
        workoutRepository.deleteById(id);
        return "Workout with id " + id + " deleted successfully.";
    }
}