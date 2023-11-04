package com.example.notion.services;

import com.example.notion.entities.EventLog;
import com.example.notion.entities.User;
import com.example.notion.repositorys.EventLogRepository;
import com.example.notion.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public Optional<EventLog> findById(Integer id){
        return eventLogRepository.findById(id);
    }

    public EventLog create(Integer id, String eventType, String eventDetail){
        EventLog eventLog = new EventLog();
        Optional<User> user = userRepository.findById(id);
        eventLog.setUser(user.get());
        eventLog.setTimestamp(LocalDateTime.now());
        eventLog.setEventType(eventType);
        eventLog.setEventDetails(eventDetail);

        return eventLogRepository.save(eventLog);
    }
}
