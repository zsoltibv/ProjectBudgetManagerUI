import { Project } from './models/Project';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryImportComponent } from "./components/salary-import/salary-import.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { ProjectComponent } from "./components/project/project.component";

const routes: Routes = [
  { path: 'salary-import', component: SalaryImportComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:projectId', component: ProjectComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', component: SalaryImportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
