package com.example.notion.repositorys;

import com.example.notion.entities.EventLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventLogRepository extends MongoRepository<EventLog, Integer> {
    @Query("{ 'id': ?0 }")
    List<EventLog> finbById(@Param("id") Integer id);
}
