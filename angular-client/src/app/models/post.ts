import { Comment } from './comment';
import { Usuario } from './usuario';

export class Post {
  public _id: string;
  public user: Usuario;
  public image: string;
  public title: string;
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
