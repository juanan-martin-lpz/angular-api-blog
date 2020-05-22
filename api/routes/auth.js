const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

var router = express.Router();

var User = require('../models/user');

router.post('/login', (req, res, next) => {
  // Autenticacion de usuario.
  // Si no existe devolvemos un mensaje y user y token a null

  console.log(req);
  
  passport.authenticate('login', (err, user, info) => {

    try {
      if (err || !user) {
        return res.json({
          status: false,
          message: 'Login unsuccessful',
          user: null,
          token: null
        });
      }
      
      // Si existe....
      req.login(user, { session: false }, error => {
        
        if (error) return next(error);
        // Codificamos el token a partir del user id de la db y el nombre del usuario.
        const body = { _id: user._id, name: user.name };

        // Firmamos el payload con nuestra superclave
        const token = jwt.sign({ user: body }, 'top_secret');

        // Devolvemos un mensaje y un user mas el token que debe usar el cliente para
        // acceder a la parte privada del api
        return res.json({
          status: true,
          message: 'Login successful',
          user: req.user,
          token: token
        });
      });
      
    } catch (error) {
      //return next(error);
      return res.json({
        status: false,
        message: 'Login error',
        user: '',
        token: ''
      });
    }
  })(req, res, next);
});

// Creacion de usuarios

router.post('/signup', (req, res, next) => {

    var data = req.body;
  
    console.log(data);
    
    console.log(data);

    var user = new User();
  
    user.name = data.name;
    user.password = data.password;
    user.firstname = data.firstname;
    user.lastname = data.lastname;
  
    user.save(user, (err, u) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al crear usuario',
          errors: err
        });
      }
  
      res.json({status: "ok",  message: 'Usuario creado con exito', user: u });
    });
});

module.exports = router;
