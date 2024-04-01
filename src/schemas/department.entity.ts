import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {

    @Prop()
    departmentNumber: Number

    @Prop()
    Name: String

    @Prop({ type: Types.ObjectId, ref: 'permission' })
    departmentMenagerNumber: Types.ObjectId

    @Prop()
    location: String
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);