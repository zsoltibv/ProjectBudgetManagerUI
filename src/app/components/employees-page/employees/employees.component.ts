import { Employee } from './../../../models/Employee';
import { EmployeeService } from './../../../services/employee.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  employees: Employee[] = [];
  displayedColumns: string[] = ['actions', 'name', 'hourlyPay'];
  dataSource = new MatTableDataSource<Employee>();
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((employees) => {
      this.employees = employees;
      this.dataSource.data = this.employees;
      this.loading = false;
    });
  }

  seeInfo(employee: Employee): void {
    this.router.navigate([`/employee/${employee.employeeId}`]);
  }
}
