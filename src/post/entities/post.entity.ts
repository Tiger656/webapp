import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  textContent: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: ObjectId;

  // @Prop()
  // authorIdLikes: Array<ObjectId>;

  // @Prop()
  // commnets: Array<Comment>
}

export const PostSchema = SchemaFactory.createForClass(Post);
