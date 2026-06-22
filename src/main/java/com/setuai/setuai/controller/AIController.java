package com.setuai.setuai.controller;

import com.setuai.setuai.model.Scheme;
import com.setuai.setuai.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private SchemeRepository schemeRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String FASTAPI_BASE_URL = "http://localhost:8000/api/ai";

    // 1. MULTILINGUAL AI CHAT
    @PostMapping("/chat")
    public ResponseEntity<String> aiChat(@RequestBody Map<String, Object> requestBody) {
        String url = FASTAPI_BASE_URL + "/chat";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            return restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "FastAPI AI service is unavailable: " + e.getMessage());
        }
    }

    // 2. AI ELIGIBILITY CHECKER
    @PostMapping("/check-eligibility")
    public ResponseEntity<String> checkEligibility(@RequestBody Map<String, Object> requestBody) {
        String schemeId = (String) requestBody.get("schemeId");
        Map<String, Object> userProfile = (Map<String, Object>) requestBody.get("userProfile");

        if (schemeId == null || userProfile == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing schemeId or userProfile in request");
        }

        // Retrieve the scheme details from MongoDB
        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Scheme not found"));

        // Package the scheme details and user profile for the FastAPI AI endpoint
        Map<String, Object> aiPayload = new HashMap<>();
        aiPayload.put("schemeTitle", scheme.getTitle());
        aiPayload.put("schemeDescription", scheme.getDescription());
        aiPayload.put("eligibilityCriteria", scheme.getEligibilityCriteria());
        aiPayload.put("userProfile", userProfile);

        String url = FASTAPI_BASE_URL + "/check-eligibility";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(aiPayload, headers);

        try {
            return restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "FastAPI AI service is unavailable: " + e.getMessage());
        }
    }

    // 3. POLICY SUMMARIZER / EXPLAINER
    @PostMapping("/summarize")
    public ResponseEntity<String> aiSummarize(@RequestBody Map<String, Object> requestBody) {
        String url = FASTAPI_BASE_URL + "/summarize";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            return restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "FastAPI AI service is unavailable: " + e.getMessage());
        }
    }
}
