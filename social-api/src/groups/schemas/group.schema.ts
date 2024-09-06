import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
  members: User[];

  @Prop({ default: '' })
  join_code: string;

  @Prop({ type: Date, default: () => new Date(0) })
  join_code_expiration_date: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);