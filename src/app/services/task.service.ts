import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { WorkDay } from "../models/WorkDay";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiEndpoint: string = 'http://localhost:5238/api/Task';

  constructor(private httpClient: HttpClient) { }

  getAllTasksInInterval(employeeId: string, startDate: Date, endDate: Date): Observable<WorkDay[]> {
    const url = `${this.apiEndpoint}/GetAllTasksOfEmployeeInAnInterval`;

    const params = {
      employeeId: employeeId.toString(),
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate)
    };

    return this.httpClient.get<WorkDay[]>(url, { params });
  }

  private formatDate(date: Date): string {
    const formattedDate = new Date(date);
    formattedDate.setDate(formattedDate.getDate() + 1);
    return formattedDate.toISOString().replace(/T.*/, 'T00:00:00.000Z');
  }
}
