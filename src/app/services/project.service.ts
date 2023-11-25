import { Injectable } from '@angular/core';
import { Project } from "../models/Project";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiEndpoint: string = 'http://localhost:5238/api/Project';
  private selectedProjectSubject = new BehaviorSubject<Project | null>(null);

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    const projectsUrl = `${this.apiEndpoint}/GetAllProjects`;
    return this.httpClient.get<Project[]>(projectsUrl);
  }

  getProjectStatistics(id: string): Observable<any> {
    console.log('getProjectStatistics', id);
    const projectsUrl = `${this.apiEndpoint}/GetStatisticsForAProject/${id}`;
    return this.httpClient.get(projectsUrl);
  }

  setSelectedProject(project: Project): void {
    this.selectedProjectSubject.next(project);
  }

  getSelectedProject(): Observable<Project | null> {
    return this.selectedProjectSubject.asObservable();
  }
}
