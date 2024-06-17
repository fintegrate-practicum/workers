import { TaskStatus } from "../classes/enum/taskStatus.enum";

export interface UpdateTaskManagerDTO{
    description: string;
    taskName:string;
    status: TaskStatus;
    targetDate:Date;
    employee:string[];
}