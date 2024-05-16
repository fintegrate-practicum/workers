import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDoc = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  managerId: string;

  @Prop({ required: true })
  taskName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  targetDate: string;

  @Prop({ required: true })
  associatedWithEmployee: string;

  @Prop({ required: true })
  theUrgencyOfTheTask: number;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
