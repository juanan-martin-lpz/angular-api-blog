var express = require('express');
var router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');



// El formato de las repuestas tiene como elemento comun un mensaje de texto (message)
// y para las operaciones que involucren un solo item, el item procesado.

// Nuevo Post
// Requiere un user id y un texto para el contenido

router.post('/', function(req, res, next) {

  var data = req.body;

  console.log(data);

  var post = new Post();
  post.user = data.user;
  post.image = data.image;
  post.title = data.title;
  post.content = data.content;

  post.save(post, (err, p) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error al crear Post',
        errors: err
      });
    }

    res.json({status: "ok",  message: 'Post creado con exito', post: p });
  });
});

// Borra un post con sus comentarios
router.delete('/:id', function(req, res, next) {
  
  var id = req.params.id;

  Comment.deleteMany({post: post._id})
  .exec((err, comments) => {

    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error al borrar los comentarios del post',
        errors: err
      });
    }

    Post.findByIdAndDelete(id, (err, post) => {

      if (err) {

        const observer = {
          next: comment => comment.save(),
          error: error => json({
            status: false,
            message: 'Error al recuperar los comentarios del post',
            errors: error
          })
        };

        // Recuperar los post
        from(comments).subscribe(observer );

        return res.status(500).json({
          status: false,
          message: 'Error al borrar el post',
          errors: err
        });        
      }

      res.json({ 
        status: true, 
        message: 'Post borrado correctamente',
        post: post });
    });
  
  });

});

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

// Retorna el post identificado por id
router.get('/:id', function(req, res, err) {
  
  var id = req.params.id;

  Post.findById(id, (err, doc) => {

    if (err) {
      return res.status(400).json({
        status: false,
        message: 'Ha ocurrido un error al recuperar el post',
        errors: err
      });
    }

    return res.json({status: "ok",  message: 'Peticion correcta', post: doc });
  });

});

// Modifica el post identificado por id
router.put('/:id', function(req, res, err) {

  var id = req.params.id;

  Post.findById(id, (err, post) => {

    var data = req.body;

    post.image = data.image;
    post.title = data.title;
    post.content = data.content;
    
    post.save(post, (err, p) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al modificar el post',
          errors: err
        });
      }

      res.json({status: "ok",  message: 'Usuario modificado con exito', post: p });
    });
  });

    
});

module.exports = router;
