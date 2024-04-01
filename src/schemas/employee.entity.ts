import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;

  @Prop()
  code: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop({ type: Types.ObjectId, ref: 'role' })
  roleId: Types.ObjectId;

  //Change to relevant roles
  @Prop({ enum: ['secretary', 'cleaner', 'deliveryPerson'] })
  position: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
