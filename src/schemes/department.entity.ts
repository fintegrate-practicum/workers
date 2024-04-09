import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {
  @Prop()
  depNumber: number;

  @Prop()
  deptName: string;

  @Prop({ type: Types.ObjectId, ref: 'permission' })
  menagerNumber: Types.ObjectId;

  @Prop()
  location: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
