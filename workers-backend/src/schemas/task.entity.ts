import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum StatusEnum {
  ToDo = 1,
  InProgress = 2,
  Completed = 3,
}
export type TaskDoc = Task & Document;
@Schema()
export class Task {
  @Prop({ required: true })
  businessId: string;
  @Prop({ required: true })
  taskName: string;
  @Prop({ required: true })
  managerId: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  targetDate: Date;
  @Prop({ required: true })
  employee: string;
  @Prop({ required: true })
  urgency: number;
  @Prop({ required: true, enum: StatusEnum, default: StatusEnum.ToDo })
  status: StatusEnum;
  @Prop({ default: null })
  completionDate: Date;
}
export const TaskSchema = SchemaFactory.createForClass(Task);





