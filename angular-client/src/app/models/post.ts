import { Comment } from './comment';

export class Post {
  public _id: string;
  public user: string;
  public image: string;
  public content: string;
  public comments: Comment[];
}


/*
var Post = new Schema({
  user: { type: ObjectId, ref: 'User' }, // User
  image: String,
  content: String,
  comments: { type: [ObjectId], ref: 'Comment' } // Comment
});
*/
