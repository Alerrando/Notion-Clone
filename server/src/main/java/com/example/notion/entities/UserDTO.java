package com.example.notion.entities;

import com.example.notion.Enum.UserRole;

import java.util.List;

public class UserDTO {
    private List<Annotation> annotations;
    private UserRole role;

    public UserDTO(){
    }

    public UserDTO(List<Annotation> annotations, UserRole role) {

        this.annotations = annotations;
        this.role = role;
    }

    public List<Annotation> getAnnotations() {
        return annotations;
    }

    public void setAnnotations(List<Annotation> annotations) {
        this.annotations = annotations;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
