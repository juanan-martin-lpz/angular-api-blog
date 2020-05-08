const express = require('express');
const app = express();

var Comment = require('../models/comment');
var Post = require('../models/post');

// Recupera un comentario por el id
app.get('/:id', (req, res) => {

    const id = req.params.id;

    Post.findById(id)
    .populate('comments')
    .exec((err, post) => {

      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al consultar los comentarios del post',
          errors: err
        });
      }

      res.status(200).json({
        status: true,
        message: 'Comentarios recuperados correctamente',
        comments: post.comments
      });

    });
});


// Guarda un comentario.
// Necesita un id de usuario, un id de post y un contenido
app.post('/', (req, res) => {
  
    var data = req.body;

    var comment = new Comment();

    comment.user = data.user;
    comment.post = data.post;
    comment.content = data.content;

    Post.findById(comment.post._id, (err, post) => {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Error al recuperar el Post',
                errors: err
            });
        }

        post.comments.push(comment);

        post.save(post, (err, post) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Error al guardar el comentario',
                    errors: err
                });
            }

            comment.save();

            res.status(200).json({
                status: true,
                message: 'Comentario guardado correctmente',
                post: post
            });
        });
        
    });
});


// Modifica el comentario identificado por el id
app.put('/:id', (req, res) => {

  var id = req.params.id;

  Comment.findById(id, (err, comment) => {

    var data = req.body;

    comment.content = data.content;
    
    comment.save(comment, (err, c) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al modificar el comentario',
          errors: err
        });
      }

      res.json({status: "ok",  message: 'Comentario modificado con exito', comment: c });
    });
  });

  
});


// borra el comentario identificado por el id
app.delete('/:id', (req, res) => {

  var id = req.params.id;

  Comment.findByIdAndDelete(id, (err, comment) => {

    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error al borrar el comentario',
        errors: err
      });        
    }

    res.json({ 
      status: true, 
      message: 'Comentario borrado correctamente',
      comment: comment });
  });

});

module.exports = app;
