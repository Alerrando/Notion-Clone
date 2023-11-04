package com.example.notion.services;

import com.example.notion.entities.EventLog;
import com.example.notion.entities.User;
import com.example.notion.repositorys.EventLogRepository;
import com.example.notion.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventLogService {
    @Autowired
    private EventLogRepository eventLogRepository;
    @Autowired
    private UserRepository userRepository;

    public List<EventLog> findAll(){
        return eventLogRepository.findAll();
    }

    public List<EventLog> findById(Integer id){
        return eventLogRepository.findUserEventById(id);
    }

    public EventLog create(EventLog eventLog){
        Optional<User> user = userRepository.findById(eventLog.getId());
        eventLog.setTimestamp(new Date());

        return eventLogRepository.save(eventLog);
    }
}
