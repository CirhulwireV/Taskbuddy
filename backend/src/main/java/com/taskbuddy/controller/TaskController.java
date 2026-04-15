
package com.taskbuddy.controller;

import com.taskbuddy.model.Task;
import com.taskbuddy.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping
    public List<Task> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Task getOne(@PathVariable String id) { return service.getById(id); }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task t) {
        return ResponseEntity.status(201).body(service.create(t));
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable String id, @RequestBody Task t) {
        return service.update(id, t);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
