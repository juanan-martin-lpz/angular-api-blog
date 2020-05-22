const express = require('express');
const app = express();

var User = require('../models/user');


app.get('/', (req, res) => {

    User.find({})
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al consultar los usuarios',
          errors: err
        });
      }

      res.status(200).json({
        status: true,
        message: 'Usuarios recuperados correctamente',
        users: users
      });
    });
});

app.get('/:id', (req, res) => {

  
  var id = req.params.id;
  console.log(id);
  
  User.findById(id,(err, user) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error al consultar los usuarios',
        errors: err
      });
    }

    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Usuario no encontrado',
        errors: err
      });
    }

    console.log(user);

    res.status(200).json({
      status: true,
      message: 'Usuarios recuperados correctamente',
      user: user
    });
  });
});

app.post('/', (req, res) => {
  var data = req.body;

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

    res.json({status: true,  message: 'Usuario creado con exito', user: u });
  });

});


app.put('/:id', (req, res) => {

  var id = req.params.id;

  User.findById(id, (err, user) => {

    var data = req.body;

    user.name = data.name;
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    
    user.save(user, (err, u) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al modificar usuario',
          errors: err
        });
      }

      res.json({status: true,  message: 'Usuario modificado con exito', user: u });
    });
  });

  
});


app.delete('/:id', (req, res) => {

  var id = req.params.id;

  User.findByIdAndDelete(id, (err, user) => {

    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error al borrar el usuario',
        errors: err
      });        
    }

    res.json({ 
      status: true, 
      message: 'Usuario borrado correctamente',
      user: user });
  });

});

module.exports = app;
