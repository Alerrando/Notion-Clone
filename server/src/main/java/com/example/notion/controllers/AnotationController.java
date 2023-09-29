package com.example.notion.controllers;

import com.example.notion.entities.Annotation;
import com.example.notion.services.AnnotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://localhost:5173")
@RestController
@RequestMapping(value = "/annotation")
public class AnotationController {
    @Autowired
    AnnotationService annotationService;

    @GetMapping
    public List<Annotation> findAll(){
        return annotationService.findAll();
    }

    @PostMapping
    public Annotation create(@RequestBody Annotation annotation){
        return annotationService.create(annotation);
    }
}
