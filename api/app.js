// Requisitos de la api

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var db = require('./config/db');
var jwt = require('jsonwebtoken');

// requisitos de middleware
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var postsRouter = require('./routes/posts');

// Establecemos la app
var app = express();

// Inicializamos passport, un poco chapucilla
var UserModel = require('./models/user');
var auth = require('./config/passport')(passport, UserModel);

// Mas middleware. Faltaria Cors
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autenticacion
app.use('/', authRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/api/v1/post', passport.authenticate('jwt', { session: false }), postsRouter);

//
module.exports = app;
