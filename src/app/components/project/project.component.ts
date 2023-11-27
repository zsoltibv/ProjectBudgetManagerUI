import { Component, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Project } from "src/app/models/Project";
import { ProjectStatistics } from "src/app/models/ProjectStatistics";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project: Project | null = null;
  statistics: ProjectStatistics | null = null;
  chartData: any = null;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];

      this.projectService.getProjectById(projectId).subscribe((project) => {
        this.project = project;
      });

      this.projectService.getProjectStatistics(projectId).subscribe((statistics) => {
        console.log('statistics', statistics);
        this.statistics = statistics;

        this.chartData = {
          labels: [
            'Spent Budget',
            'Remaining Budget',
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [this.statistics?.spentBudget, this.statistics?.remainingBudget],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
          }]
        };
      });
    });
  }

  goBack(): void {
    window.history.back();
  }
}
