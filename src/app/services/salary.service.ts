import { WeeklySalary } from './../models/WeeklySalary';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private apiEndpoint: string = 'http://localhost:5238/api/ExportDataToDb/AddAllData';
  private salaryEndpoint: string = 'http://localhost:5238/api/Salary';

  constructor(private httpClient: HttpClient) { }

  importFile(file: File) {
    let formData: FormData = new FormData();
    formData.append('jsonFile', file, file.name);

    return this.httpClient.post(this.apiEndpoint, formData);
  }

  getEmployeeSalary(employeeId: string): Observable<WeeklySalary[] | null> {
    return this.httpClient.get<WeeklySalary[] | null>(`${this.salaryEndpoint}/GetSalary/${employeeId}`);
  }

  paySalary(weeklySalary: WeeklySalary): Observable<any | null> {
    const params = new HttpParams()
      .set('startDate', this.formatDate(weeklySalary.startDate))
      .set('endDate', this.formatDate(weeklySalary.endDate));

    return this.httpClient.put<any | null>(
      `${this.salaryEndpoint}/PaySalary/${weeklySalary.employee.employeeId}`,
      null,
      { params }
    );
  }

  private formatDate(date: Date): string {
    const formattedDate = new Date(date);
    formattedDate.setDate(formattedDate.getDate() + 1);
    return formattedDate.toISOString().replace(/T.*/, ' 00:00:00.0000000');
  }
}
