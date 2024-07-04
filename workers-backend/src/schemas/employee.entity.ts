import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from './EmployeeRole.entity';
@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop()
  userId: string;

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
