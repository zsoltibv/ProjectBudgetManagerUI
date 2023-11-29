import { WorkDay } from './../../../models/WorkDay';
import { EmployeeService } from './../../../services/employee.service';
import { ActivatedRoute } from "@angular/router";
import { TaskService } from './../../../services/task.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Employee } from "src/app/models/Employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  employeeId!: string;
  loading = true;
  employee: Employee | null = null;
  workDays: WorkDay[] = [];

  range: FormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<WorkDay> = new MatTableDataSource();
  displayedColumns: string[] = ['date', 'hours', 'taskName', 'taskPrice', 'isDone', 'projectName', 'isSpecial'];

  constructor(private taskService: TaskService, private route: ActivatedRoute, private fb: FormBuilder, private employeeService: EmployeeService) {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

    this.range = this.fb.group({
      start: [oneWeekAgo],
      end: [today],
    });

    this.range.valueChanges.subscribe(() => {
      if (this.range.valid) {
        this.onSubmit();
      }
    });
    this.loading = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['employeeId'];

      this.employeeService.getEmployeeById(this.employeeId).subscribe((employee) => {
        this.employee = employee;
      });
    });
    this.onSubmit();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(): void {
    if (this.employeeId && this.range.value.start && this.range.value.end) {
      this.taskService.getAllTasksInInterval(this.employeeId, this.range.value.start, this.range.value.end).subscribe((workDays) => {
        workDays.forEach(workDay => {
          if (!workDay.employeeTasks || workDay.employeeTasks.length === 0) {
            workDay.employeeTasks = [{ hours: 0, task: { taskId: '', name: '', price: 0, isDone: false, project: { projectId: '', name: '', isSpecial: false } } }];
          }
        });

        this.workDays = workDays;
        this.dataSource.data = workDays;
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
}
