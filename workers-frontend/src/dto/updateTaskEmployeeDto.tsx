import { TaskStatus } from "../classes/enum/taskStatus.enum";

export interface UpdateTaskEmployeeDTO{
    description: string;
    status: TaskStatus;
}
  