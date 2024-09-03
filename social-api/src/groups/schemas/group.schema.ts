import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type GroupDocument = HydratedDocument<Group>

@Schema()
export class Group {

  @Prop({ required: true })
  name: string

  @Prop({required: true, ref: 'users'})
  owner_id: string

  @Prop({ type: [String], ref: 'users', default: [] })
  member_ids: string[]
}

export const GroupSchema = SchemaFactory.createForClass(Group)