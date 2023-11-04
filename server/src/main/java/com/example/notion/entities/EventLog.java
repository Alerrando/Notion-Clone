package com.example.notion.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_log")
public class EventLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    private LocalDateTime timestamp;
    private String eventType;
    private String eventDetails;

    public EventLog(){
    }

    public EventLog(Integer id, User user, LocalDateTime timestamp, String eventType, String eventDetails) {
        this.id = id;
        this.user = user;
        this.timestamp = timestamp;
        this.eventType = eventType;
        this.eventDetails = eventDetails;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventDetails() {
        return eventDetails;
    }

    public void setEventDetails(String eventDetails) {
        this.eventDetails = eventDetails;
    }
}
