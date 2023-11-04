package com.example.notion.entities;

public class EventLogDTO {
    private Integer id;
    private String eventType;
    private String eventDetail;

    public EventLogDTO(){
    }

    public EventLogDTO(Integer id, String eventType, String eventDetail) {
        this.id = id;
        this.eventType = eventType;
        this.eventDetail = eventDetail;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventDetail() {
        return eventDetail;
    }

    public void setEventDetail(String eventDetail) {
        this.eventDetail = eventDetail;
    }
}
