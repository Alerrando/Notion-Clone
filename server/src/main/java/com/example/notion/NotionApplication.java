package com.example.notion;

import com.example.notion.repositorys.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(exclude =  {DataSourceAutoConfiguration.class })

public class NotionApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotionApplication.class, args);
	}

}
