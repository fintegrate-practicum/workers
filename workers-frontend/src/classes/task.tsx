export enum StatusEnum {
    ToDo = 1,
    Open = 2,
    InProgress = 3,
    Completed = 4
}
export default class Task {

    businessId!: string;
    managerId!: string;
    taskName!: string;
    description!: string;
    targetDate!: Date;
    employee!: string[];
    urgency!: number;
    status!: StatusEnum;
    completionDate!: Date;

    constructor() { }
}