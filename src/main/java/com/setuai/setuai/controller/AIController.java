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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private SchemeRepository schemeRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String FASTAPI_BASE_URL =
            "http://localhost:8000/api/ai";

    // ==========================
    // AI CHAT
    // ==========================
    @PostMapping("/chat")
    public ResponseEntity<String> aiChat(
            @RequestBody Map<String, Object> requestBody) {

        return forwardToFastApi(
                FASTAPI_BASE_URL + "/chat",
                requestBody
        );
    }

    // ==========================
    // ELIGIBILITY CHECKER
    // ==========================
    @PostMapping("/check-eligibility")
    public ResponseEntity<String> checkEligibility(
            @RequestBody Map<String, Object> requestBody) {

        String schemeId = (String) requestBody.get("schemeId");

        @SuppressWarnings("unchecked")
        Map<String, Object> userProfile =
                (Map<String, Object>) requestBody.get("userProfile");

        if (schemeId == null || userProfile == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Missing schemeId or userProfile"
            );
        }

        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Scheme not found"
                        ));

        Map<String, Object> aiPayload = new HashMap<>();
        aiPayload.put("schemeTitle", scheme.getTitle());
        aiPayload.put("schemeDescription", scheme.getDescription());
        aiPayload.put("eligibilityCriteria",
                scheme.getEligibilityCriteria());
        aiPayload.put("userProfile", userProfile);

        return forwardToFastApi(
                FASTAPI_BASE_URL + "/check-eligibility",
                aiPayload
        );
    }

    // ==========================
    // SUMMARIZER
    // ==========================
    @PostMapping("/summarize")
    public ResponseEntity<String> aiSummarize(
            @RequestBody Map<String, Object> requestBody) {

        return forwardToFastApi(
                FASTAPI_BASE_URL + "/summarize",
                requestBody
        );
    }

    // ==========================
    // COMMON FASTAPI CALL METHOD
    // ==========================
    private ResponseEntity<String> forwardToFastApi(
            String url,
            Map<String, Object> payload) {

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(payload, headers);

            return restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

        } catch (Exception e) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "FastAPI service unavailable: " + e.getMessage()
            );
        }
    }
}
