var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Post = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // User
  image: String,
  title: {type: String, required: false},
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}] // Comment
});

var PostModel = mongoose.model('Post', Post);

module.exports = PostModel;
