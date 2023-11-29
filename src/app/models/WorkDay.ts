import { EmployeeTask } from "./EmployeeTask";

export interface WorkDay {
  date: Date;
  employeeTasks: EmployeeTask[];
}
