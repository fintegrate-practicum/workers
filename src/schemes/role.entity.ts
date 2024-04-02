import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
    @Prop()
    title: string

    @Prop()
    description: String

    @Prop({ default: false })
    active: Boolean
}

export const RoleSchema = SchemaFactory.createForClass(Role);