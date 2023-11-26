import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Project } from "src/app/models/Project";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = [];
  displayedColumns: string[] = ['actions', 'name', 'isSpecial'];
  dataSource = new MatTableDataSource<Project>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
      this.dataSource.data = this.projects;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  seeInfo(project: Project): void {
    this.projectService.setSelectedProject(project);
    this.router.navigate([`/project/${project.projectId}`]);
  }
}
