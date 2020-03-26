var express = require('express');
var router = express.Router();

var Post = require('../models/post');

// El formato de las repuestas tiene como elemento comun un mensaje de texto (message)
// y para las operaciones que involucren un solo item, el item procesado.

// Nuevo Post
// Requiere un user id y un texto para el contenido

router.post('/new', function(req, res, next) {
  var data = req.body;

  Post.create({ user: data.user, content: data.content }, err => {
    if (err) {
      throw err;
    }

    res.json({ message: 'Post success', post: data });
  });
});

// Borra todos los post. No elimina los comentarios
router.post('/deleteall', function(req, res, next) {
  Post.deleteMany({}, err => {
    if (err) {
      throw err;
    }

    res.json({ message: 'Delete All Post success' });
  });
});

// Retorna todos los post
router.get('/all', function(req, res, err) {
  var all = Post.find({});

  all.exec(function(err, docs) {
    if (err) {
      res.json({ message: err });
    }

    res.send(docs);
  });
});

// Retorna el post identificado por id
router.get('/:id', function(req, res, err) {
  var id = req.params.id;

  var all = Post.findOne({ _id: id });

  all.exec(function(err, docs) {
    if (err) {
      res.json({ message: err });
    }

    res.send(docs);
  });
});

// Modifica el post identificado por id
router.put('/edit/:id', function(req, res, err) {});

module.exports = router;
