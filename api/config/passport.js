module.exports = (passport, User) => {
  var localStrategy = require('passport-local').Strategy;

  const JWTstrategy = require('passport-jwt').Strategy;
  // Extractor de JWT
  const ExtractJWT = require('passport-jwt').ExtractJwt;

  var opts = {
    // Clave para el cifrado. Super secreta. No poner aqui, solo para efectos ilustrativos
    secretOrKey: 'top_secret',
    // Establecemos el extractor que vamos a usar. Usamos un campo llamado token que se adjunta al body como x-www.form-urlencoded.
    jwtFromRequest: ExtractJWT.fromBodyField('token')
  };

  // Comprobamos que las credenciales son validas.
  passport.use(
    new JWTstrategy(opts, (payload, done) => {
      User.findOne({ id: payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          // Podriamos redirigir al signup
          return done(null, false);
        }
      });
    })
  );

  // Creamos el middleware para el registro de usuarios
  passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'name',
        passwordField: 'password'
      },
      async (name, password, done) => {
        try {
          console.warn('Saving user');

          // Guardamos en la base de datos
          const user = await User.create({ name, password });
          // retornamos para el proximo middleware
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // Middleware para el login
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'name',
        passwordField: 'password'
      },
      async (name, password, done) => {
        try {
          console.warn('Searching User...');

          // Buscamos nuestro user
          const user = await User.findOne({ name });

          if (!user) {
            // Si no lo encontramos...
            console.warn('User not found');

            // retornamos un error.
            return done(null, false, { message: 'User not found' });
          }
          // Validamos el password comparandolo con el hash que tenemos almacenado en la base de datos
          // Si son iguales procedemos a enviar la cookie con el token de autorizacion

          console.log('User found: ' + user.name);
          console.warn('Validating user....wait');

          console.log(user);

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
          // Enviamos el resultado al proximo middleware
          console.warn('User found!!!');
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
