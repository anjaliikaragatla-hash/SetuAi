package com.setuai.setuai.repository;

import com.setuai.setuai.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    List<Application> findByUserEmail(String userEmail);
}
