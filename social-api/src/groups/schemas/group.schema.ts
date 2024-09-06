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

  @Prop({default: ''})
  join_code: string

  @Prop({ type: Date, default: () => new Date(0) })
  join_code_expiration_date: Date
}

export const GroupSchema = SchemaFactory.createForClass(Group)