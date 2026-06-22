package com.setuai.setuai.controller;

import com.setuai.setuai.model.Scheme;
import com.setuai.setuai.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
public class SchemeController {

    @Autowired
    private SchemeRepository schemeRepository;

    // GET ALL SCHEMES (with optional filtering and search)
    @GetMapping
    public List<Scheme> getAllSchemes(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String search) {

        if (search != null && !search.isEmpty()) {
            return schemeRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search);
        } else if (state != null && !state.isEmpty() && category != null && !category.isEmpty()) {
            return schemeRepository.findByStateIgnoreCaseAndCategory(state, category);
        } else if (state != null && !state.isEmpty()) {
            return schemeRepository.findByStateIgnoreCase(state);
        } else if (category != null && !category.isEmpty()) {
            return schemeRepository.findByCategory(category);
        }

        return schemeRepository.findAll();
    }

    // GET SINGLE SCHEME
    @GetMapping("/{id}")
    public Scheme getSchemeById(@PathVariable String id) {
        return schemeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Scheme not found"));
    }

    // CREATE NEW SCHEME
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Scheme createScheme(@RequestBody Scheme scheme) {
        return schemeRepository.save(scheme);
    }
}
