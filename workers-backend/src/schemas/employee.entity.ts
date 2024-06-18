import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from './employeeRole.entity';
@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop()
  businessId: Types.ObjectId;

  @Prop()
  nameEmployee: string;

  @Prop()
  code: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  role: Role;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
