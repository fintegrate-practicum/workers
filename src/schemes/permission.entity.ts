import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Permission extends Document {

    @Prop()
    type:String

    @Prop({default:false})
    active: Boolean

    @Prop()
    description: String
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);