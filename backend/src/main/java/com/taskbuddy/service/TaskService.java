
package com.taskbuddy.service;

import com.taskbuddy.model.Task;
import com.taskbuddy.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public List<Task> getAll() { return repo.findAll(); }

    public Task getById(String id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task create(Task t) { return repo.save(t); }

    public Task update(String id, Task t) {
        Task existing = getById(id);
        existing.setTitle(t.getTitle());
        existing.setDescription(t.getDescription());
        existing.setPriority(t.getPriority());
        existing.setStatus(t.getStatus());
        return repo.save(existing);
    }

    public void delete(String id) { repo.deleteById(id); }
}
