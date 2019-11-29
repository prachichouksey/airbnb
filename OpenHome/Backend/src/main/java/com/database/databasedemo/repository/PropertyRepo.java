package com.database.databasedemo.repository;

import com.database.databasedemo.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepo extends JpaRepository<Property,Integer> , JpaSpecificationExecutor {


    List<Property> findByCityLike(String city);
}
