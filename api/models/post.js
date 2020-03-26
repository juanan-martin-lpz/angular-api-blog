var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Schema = mongoose.Schema;
var Post = new Schema({
  user: { type: ObjectId, ref: 'User' }, // User
  content: String,
  comments: { type: [ObjectId], ref: 'Comment' } // Comment
});

var PostModel = mongoose.model('Post', Post);

module.exports = PostModel;
