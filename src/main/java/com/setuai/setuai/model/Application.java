package com.setuai.setuai.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "applications")
public class Application {

    @Id
    private String id;
    
    private String userEmail; // Linked to user's identity from JWT
    private String schemeId;
    private String schemeTitle; // Cache scheme title for easier frontend display
    private String status; // "ELIGIBLE", "APPLIED", "IN_PROGRESS", "APPROVED"
    private Date appliedDate;
    private String notes;

    public Application() {}

    public Application(String id, String userEmail, String schemeId, String schemeTitle, String status, Date appliedDate, String notes) {
        this.id = id;
        this.userEmail = userEmail;
        this.schemeId = schemeId;
        this.schemeTitle = schemeTitle;
        this.status = status;
        this.appliedDate = appliedDate;
        this.notes = notes;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getSchemeId() { return schemeId; }
    public void setSchemeId(String schemeId) { this.schemeId = schemeId; }

    public String getSchemeTitle() { return schemeTitle; }
    public void setSchemeTitle(String schemeTitle) { this.schemeTitle = schemeTitle; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Date getAppliedDate() { return appliedDate; }
    public void setAppliedDate(Date appliedDate) { this.appliedDate = appliedDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
