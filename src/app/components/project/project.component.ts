import { Component, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Project } from "src/app/models/Project";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project: Project | null = null;
  statistics: any = null;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];

      this.projectService.getSelectedProject().subscribe((selectedProject) => {
        this.project = selectedProject;
      });

      this.projectService.getProjectStatistics(projectId).subscribe((statistics) => {
        console.log('statistics', statistics);
        this.statistics = statistics;
      });
    });
  }
}
