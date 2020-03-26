const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/login', (req, res, next) => {
  // Autenticacion de usuario.
  // Si no existe devolvemos un mensaje y user y token a null
  passport.authenticate('login', (err, user, info) => {
    try {
      console.log(user);
      if (err || !user) {
        res.json({
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
        res.json({
          message: 'Login successful',
          user: req.user,
          token: token
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Creacion de usuarios

router.post('/signup', passport.authenticate('signup', { session: false }), (req, res, next) => {
  res.json({
    message: 'Signup successful',
    user: req.user
  });
});

module.exports = router;
