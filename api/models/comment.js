var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Schema = mongoose.Schema;
var Comment = new Schema({
  user: ObjectId, // User
  post: ObjectId, // Post
  content: String
});

var CommentModel = mongoose.model('Comment', Comment);

module.exports = CommentModel;
