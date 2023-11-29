import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Employee } from "../models/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiEndpoint: string = 'http://localhost:5238/api/Employee';

  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    const employeesUrl = `${this.apiEndpoint}/GetAllEmployees`;
    return this.httpClient.get<Employee[]>(employeesUrl);
  }

  getEmployeeById(id: string): Observable<Employee | null> {
    const employeeUrl = `${this.apiEndpoint}/GetEmployeeById/${id}`;
    return this.httpClient.get<Employee | null>(employeeUrl);
  }
}
