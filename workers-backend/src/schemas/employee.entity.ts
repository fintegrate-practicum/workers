import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export enum RoleEnum {
  'secretary',
  'cleaner',
  'deliveryPerson',
  'developer',
  'tester',
  'maneger',
  'owner',
}
@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;

  @Prop()
  businessId: number;

  @Prop()
  code: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  role: RoleEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
