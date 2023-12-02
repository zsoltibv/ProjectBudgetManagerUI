import { Employee } from "./Employee";

export interface WeeklySalary {
  weeklySalaryId: number;
  startDate: Date;
  endDate: Date;
  grossAmount: number;
  grossAmountAfterTax: number;
  isPaid: boolean;
  employee: Employee;
}
