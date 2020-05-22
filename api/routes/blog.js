var express = require('express');
var router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');

// Retorna todos los post
router.get('/', function(req, res) {
  
    Post.find({})
    .populate('user')
    .populate('comments')
    .exec(function(err, docs) {
    
      if (err) {
        res.json({ message: err });
      }
  
      res.status(200).json({
        status: true,
        message: 'Consulta Blog OK',
        posts: docs
      });
    });
});

module.exports = router;
 
