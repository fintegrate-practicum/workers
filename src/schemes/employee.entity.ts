import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Employee extends Document {


    @Prop({ type: Types.ObjectId, ref: 'user' })
    userId: Types.ObjectId

    @Prop()
    code: String

    @Prop()
    createdBy: String;

    @Prop()
    updatedBy: String

    @Prop({ type: Types.ObjectId, ref: 'role' })
    roleId: Types.ObjectId
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);