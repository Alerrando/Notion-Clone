package com.example.notion.repositorys;

import com.example.notion.entities.Annotation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnnotationRepository extends MongoRepository<Annotation, Integer> {
}
