package com.demo.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{

}
