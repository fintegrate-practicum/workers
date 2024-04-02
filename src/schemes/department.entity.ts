import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {

    @Prop()
    depNumber: Number

    @Prop()
    deptName: String

    @Prop({ type: Types.ObjectId, ref: 'permission' })
    menagerNumber: Types.ObjectId

    @Prop()
    location: String
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);