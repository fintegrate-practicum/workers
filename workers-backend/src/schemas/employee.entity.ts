import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from './EmployeeRole.entity';
@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop()
  businessId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;

  @Prop()
  workerCode: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  role: Role;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
