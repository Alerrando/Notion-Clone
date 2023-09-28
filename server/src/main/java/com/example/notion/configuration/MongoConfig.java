package com.example.notion.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {
    @Bean
    public MongoTemplate mongoTemplate(){
        String mongoUrl = "mongodb://localhost:27017/admin";
        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(mongoUrl));
    }
}
