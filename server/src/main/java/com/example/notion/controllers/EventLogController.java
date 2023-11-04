package com.example.notion.controllers;

import com.example.notion.entities.EventLog;
import com.example.notion.services.EventLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/event-log")
public class EventLogController {
    @Autowired
    private EventLogService eventLogService;

    @GetMapping
    public List<EventLog> findAll(){
        return eventLogService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<EventLog> findById(@PathVariable Integer id){
        return eventLogService.findById(id);
    }

    @PostMapping
    public EventLog create(@RequestBody Integer id, @RequestBody String eventType, @RequestBody String eventDetails){
        return eventLogService.create(id, eventType, eventDetails);
    }
}
