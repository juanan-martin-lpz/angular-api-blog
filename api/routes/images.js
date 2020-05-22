var express = require('express');
var router = express.Router();
var passport = require('passport');

var fs = require('fs');
var path = require('path');

var UPLOAD_PATH = require('../config/paths').UPLOAD_PATH;


const Post = require('../models/post');

router.get('/:id', (req, res) => {

    var id = req.params.id;

    Post.findById(id, (err, doc) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: 'Hubo un error al recuperar la imagen',
                errors: err
            });
        }

        if (!doc) {
            return res.status(400).json({
                status: false,
                message: 'No se encontro la imagen',
                errors: err
            });
        }

        var image = doc.image;

        console.log(image);
        
        res.status(200).sendFile(UPLOAD_PATH + image);
    });      
});

// , passport.authenticate('jwt', { session: false })

router.put('/:id', (req, res) => {

    console.log(req);

    var id = req.params.id;

    console.log('Id del upload : ' + id );

    Post.findById(id, (err, post) => {
        if (err) {
            console.log(err);

            res.status(500).json({
                status: false,
                message: 'Error al recuperar el post',
                errors: err
            });
        }

        if (!post) {
            console.log('No hay post');
            
            res.status(500).json({
                status: false,
                message: 'No se encuentra el post indicado',
                errors: err
            });
        }

        console.log('Parece tod OK');

        var image = req.files.image;

        console.log(image);

        var imageName = post._id + '-' + new Date().getMilliseconds() + path.extname(image.name);

        image.mv(UPLOAD_PATH + imageName, (error) => {
            if (error) {
                console.log('En Imagen: ' + err);
            
                return res.status(500).json({
                    status: false,
                    message: 'Error al cargar la imagen en el servidor',
                    errors: err
                });
            }
        });

        post.title = post.title;
        post.content = post.content;

        post.image = imageName;

        post.save((err, postSaved) => {

            if (err) {
                console.log('Al borrar imagen : ' + err);
            
                fs.unlinkSync(UPLOAD_PATH + imageName);

                return res.status(500).json({
                    status: false,
                    message: 'Hubo un error al enviar la imagen del post',
                    errors: err
                });
            }

            console.log('Todo OK');
            
            return res.status(200).json({
                status: true,
                message: 'Imagen enviada correctamente',
                post: postSaved
            });
        });


    });        
});

module.exports = router;