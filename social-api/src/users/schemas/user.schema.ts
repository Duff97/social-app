import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  _id: string

  @Prop()
  name: string

  @Prop()
  bio: string
}

export const UserSchema = SchemaFactory.createForClass(User);