package com.example.notion.services;

import com.example.notion.entities.Annotation;
import com.example.notion.repositorys.AnnotationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnotationService {
    @Autowired
    AnnotationRepository annotationRepository;

    public List<Annotation> findAll(){
        return annotationRepository.findAll();
    }

    public Annotation create(Annotation annotation){
        return annotationRepository.save(annotation);
    }
}
