var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var Comment = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  post: {type: Schema.Types.ObjectId, ref: 'Post'},
  content: {type: String, required: true},
});

var CommentModel = mongoose.model('Comment', Comment);

module.exports = CommentModel;
