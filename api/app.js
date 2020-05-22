// Requisitos de la api

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var db = require('./config/db');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var fileupload = require('express-fileupload')

// requisitos de middleware
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var postsRouter = require('./routes/posts');
var commentRouter = require('./routes/comments');
var blogRouter = require('./routes/blog');
var imagesRouter = require('./routes/images');

// Establecemos la app
var app = express();

// Inicializamos passport, un poco chapucilla
var UserModel = require('./models/user');
var auth = require('./config/passport')(passport, UserModel);

app.use(fileupload());
app.use(logger('dev'));
app.use(express.json());
app.use(cors({origin: true}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autenticacion
app.use('/', authRouter);


// Middleware protegido
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/api/v1/posts/images', imagesRouter);
app.use('/api/v1/posts/comments', passport.authenticate('jwt', { session: false }), commentRouter);
app.use('/api/v1/posts', passport.authenticate('jwt', { session: false }), postsRouter);

//
module.exports = app;
