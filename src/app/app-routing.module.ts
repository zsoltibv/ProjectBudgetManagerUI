import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryImportComponent } from "./components/salary-import/salary-import.component";
import { ProjectComponent } from "./components/projects-page/project/project.component";
import { ProjectsComponent } from "./components/projects-page/projects/projects.component";
import { EmployeesComponent } from "./components/employees-page/employees/employees.component";
import { EmployeeComponent } from "./components/employees-page/employee/employee.component";

const routes: Routes = [
  { path: 'salary-import', component: SalaryImportComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:projectId', component: ProjectComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:employeeId', component: EmployeeComponent},
  { path: '**', component: SalaryImportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
