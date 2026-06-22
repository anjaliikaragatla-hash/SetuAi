package com.setuai.setuai.controller;

import com.setuai.setuai.model.Application;
import com.setuai.setuai.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    // GET CURRENT USER'S APPLICATIONS
    @GetMapping
    public List<Application> getMyApplications(@RequestAttribute("userEmail") String userEmail) {
        return applicationRepository.findByUserEmail(userEmail);
    }

    // APPLY FOR A SCHEME (Link current user context)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Application applyForScheme(@RequestBody Application application, @RequestAttribute("userEmail") String userEmail) {
        application.setUserEmail(userEmail);
        application.setAppliedDate(new Date());
        if (application.getStatus() == null) {
            application.setStatus("APPLIED");
        }
        return applicationRepository.save(application);
    }

    // UPDATE APPLICATION STATUS
    @PutMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable String id,
            @RequestParam String status,
            @RequestAttribute("userEmail") String userEmail) {

        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found"));

        // Security check: ensure user owns this application
        if (!app.getUserEmail().equalsIgnoreCase(userEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have access to this application");
        }

        app.setStatus(status);
        return applicationRepository.save(app);
    }
}
