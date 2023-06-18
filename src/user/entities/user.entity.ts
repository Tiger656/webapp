import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  //@Prop()
  //_id: ObjectId;
  @Prop()
  username: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
