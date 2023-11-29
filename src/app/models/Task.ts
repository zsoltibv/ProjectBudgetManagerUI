import { Project } from "./Project";

export interface Task {
  taskId: string;
  name: string;
  price: number;
  isDone: boolean;
  project: Project;
}
