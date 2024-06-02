import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EmployeeRole } from 'src/enum/employeeRole.enum';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop()
  businessId: string;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;

  @Prop()
  workerCode: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  role: EmployeeRole;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
