package com.example.notion.entities;

import jakarta.persistence.*;

import java.util.Date;

@Embeddable
public class Annotation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private Integer id;

    private String title;

    private String content;

    private Date lastUpdate;

    private Date createdBy;

    public Annotation(){
    }

    public Annotation(Integer id, String title, String content, Date lastUpdate, Date createdBy) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.lastUpdate = lastUpdate;
        this.createdBy = createdBy;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Date getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Date createdBy) {
        this.createdBy = createdBy;
    }
}
