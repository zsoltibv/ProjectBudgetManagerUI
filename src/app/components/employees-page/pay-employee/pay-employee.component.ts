import { Employee } from './../../../models/Employee';
import { MatPaginator } from "@angular/material/paginator";
import { WeeklySalary } from './../../../models/WeeklySalary';
import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { SalaryService } from "src/app/services/salary.service";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pay-employee',
  templateUrl: './pay-employee.component.html',
  styleUrls: ['./pay-employee.component.scss']
})
export class PayEmployeeComponent {
  weeklySalaries: WeeklySalary[] = [];
  displayedColumns: string[] = ['actions', 'startDate', 'endDate', 'grossAmount', 'grossAmountAfterTax', 'isPaid'];
  dataSource = new MatTableDataSource<WeeklySalary>();
  loading = true;

  employeeId!: string;
  employee: Employee | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private salaryService: SalaryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['employeeId'];
      this.loadEmployeeSalary();
    });
  }

  loadEmployeeSalary(): void {
    this.salaryService.getEmployeeSalary(this.employeeId).subscribe((weeklySalaries) => {
      this.weeklySalaries = weeklySalaries || [];
      this.dataSource.data = this.weeklySalaries;
      this.loading = false;
      this.employee = this.weeklySalaries[0].employee;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  paySalary(weeklySalary: WeeklySalary): void {
    this.salaryService.paySalary(weeklySalary).subscribe(
      (response) => {
        console.log('Payment successful:', response);
        this.loadEmployeeSalary();
      },
      (error) => {
        console.error('Payment failed:', error);
      }
    );
  }

  goBack(): void {
    window.history.back();
  }
}
