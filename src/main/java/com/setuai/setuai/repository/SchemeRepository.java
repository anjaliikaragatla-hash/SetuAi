package com.setuai.setuai.repository;

import com.setuai.setuai.model.Scheme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SchemeRepository extends MongoRepository<Scheme, String> {

    List<Scheme> findByCategory(String category);

    List<Scheme> findByStateIgnoreCase(String state);

    // Keyword search in title or description
    List<Scheme> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);

    // Search by state and category
    List<Scheme> findByStateIgnoreCaseAndCategory(String state, String category);
}
