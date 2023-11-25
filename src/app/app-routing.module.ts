import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryImportComponent } from "./components/salary-import/salary-import.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { TasksComponent } from "./components/tasks/tasks.component";

const routes: Routes = [
  { path: 'salary-import', component: SalaryImportComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', component: SalaryImportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
