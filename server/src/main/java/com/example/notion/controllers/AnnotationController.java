package com.example.notion.controllers;

import com.example.notion.entities.Annotation;
import com.example.notion.services.AnnotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(value = "/annotation")
public class AnnotationController {
    @Autowired
    AnnotationService annotationService;

    @PostMapping
    public ResponseEntity create(@RequestBody Annotation annotation){
        return annotationService.create(annotation);
    };

    @PutMapping
    public ResponseEntity update(@RequestBody List<Annotation> annotations){
        return annotationService.update(annotations);
    }
}
