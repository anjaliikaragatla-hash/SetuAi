package com.setuai.setuai.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "schemes")
public class Scheme {

    @Id
    private String id;
    
    private String title;
    private String description;
    private String category;
    private String benefits;
    private String eligibilityCriteria; // Simple explanation or JSON string of criteria rules
    private String applicationUrl;
    private String state;
    private String department;

    public Scheme() {}

    public Scheme(String id, String title, String description, String category, String benefits, 
                  String eligibilityCriteria, String applicationUrl, String state, String department) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.benefits = benefits;
        this.eligibilityCriteria = eligibilityCriteria;
        this.applicationUrl = applicationUrl;
        this.state = state;
        this.department = department;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBenefits() { return benefits; }
    public void setBenefits(String benefits) { this.benefits = benefits; }

    public String getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(String eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }

    public String getApplicationUrl() { return applicationUrl; }
    public void setApplicationUrl(String applicationUrl) { this.applicationUrl = applicationUrl; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
