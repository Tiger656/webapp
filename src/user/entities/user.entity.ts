import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { BaseModel } from 'src/base/base.model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseModel {
  //@Prop()
  //_id: ObjectId;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
