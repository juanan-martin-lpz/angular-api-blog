var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Post = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // User
  image: {type: String, required: false},
  title: {type: String, required: true},
  content: {type: String, required: true},
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}] // Comment
});

var PostModel = mongoose.model('Post', Post);

module.exports = PostModel;

