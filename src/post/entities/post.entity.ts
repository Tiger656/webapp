import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { BaseModel } from 'src/base/base.model';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post extends BaseModel {
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
