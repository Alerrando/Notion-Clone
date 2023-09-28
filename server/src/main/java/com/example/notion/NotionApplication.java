package com.example.notion;

import com.example.notion.repositorys.UserMongoRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = UserMongoRepository.class)

public class NotionApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotionApplication.class, args);
	}

}
