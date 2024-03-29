import axios from "axios";

const EMPLOYEE_API_BASE_URL='http://localhost:8080/api/v1/employees';

export const listEmployees=()=> axios.get(EMPLOYEE_API_BASE_URL);

export const createEmployee=employee => axios.post(EMPLOYEE_API_BASE_URL,employee);

export const getEmployee=employeeId => axios.get(EMPLOYEE_API_BASE_URL+'/'+employeeId);

export const updateEmployee=(employeeId,employee)=>axios.put(EMPLOYEE_API_BASE_URL+"/"+employeeId,employee);

export const deleteEmployee=employeeId => axios.delete(EMPLOYEE_API_BASE_URL+"/"+employeeId);
