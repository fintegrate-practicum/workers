import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Types } from 'mongoose';

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

  @Prop({ type: Types.ObjectId, ref: 'role' })
  roleId: Types.ObjectId;

  @Prop({
    enum: [
      'secretary',
      'cleaner',
      'deliveryPerson',
      'developer',
      'tester',
      'maneger',
      'owner',
    ],
  })
  position: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
