package com.demo.ems.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.demo.ems.dto.EmployeeDto;
import com.demo.ems.entity.Employee;
import com.demo.ems.exception.ResourceNotFoundException;
import com.demo.ems.mapper.EmployeeMapper;
import com.demo.ems.repository.EmployeeRepository;
import com.demo.ems.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

	private EmployeeRepository employeeRepository;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {

		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {

		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(()->
				new ResourceNotFoundException("Employee is not exists with the given id "+employeeId));

		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {

		List<Employee> employees = employeeRepository.findAll();

		return employees.stream()
				.map(employee -> EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(()-> 
				new ResourceNotFoundException("Employee is not exists with the given id "+employeeId));

		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setEmail(updatedEmployee.getEmail());

		Employee updatedEmployeeObj = employeeRepository.save(employee);

		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {

		employeeRepository.findById(employeeId)
		.orElseThrow(()->
		new ResourceNotFoundException("Employee is not exists with the given id "+employeeId));
		employeeRepository.deleteById(employeeId);
	}

}
