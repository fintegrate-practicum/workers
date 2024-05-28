import { Types } from 'mongoose';
import {  TaskStatus } from './enum/taskStatus.enum';

export default class Task {
    taskId!:string;
    businessId!: string;
    managerId!: string;
    taskName!: string;
    description!: string;
    targetDate!: Date;
    employee!: Types.ObjectId[];
    urgency!: number;
    status!: TaskStatus;
    completionDate!: Date;

    constructor() { }
}