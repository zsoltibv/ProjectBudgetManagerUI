import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private apiEndpoint: string = 'http://localhost:5238/api/ExportDataToDb/AddAllData';

  constructor(private httpClient: HttpClient) { }

  importFile(file: File) {
    let formData: FormData = new FormData();
    formData.append('jsonFile', file, file.name);

    return this.httpClient.post(this.apiEndpoint, formData);
  }
}
