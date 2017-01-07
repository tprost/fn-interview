var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var BearerStrategy = require('passport-http-bearer').Strategy;
var db = require('../models/index.js');

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.find({where: {username: username}}).then(function(user, error) {
      if (error) {
        done(error);
      }
      if (!user) {
        done(null, false, { message: 'Incorrect username.' });
      }
      user.comparePassword(password, function(error, isMatch) {
        if (!isMatch) {
          done(null, false, { message: 'Incorrect password.' });
        }
        done(null, user);
      });
    });
  }
));

// Serialize sessions
passport.serializeUser(function (user, done) {
  done(null, user.dataValues.id);
});

// Deserialize sessions
passport.deserializeUser(function (id, done) {
  db.User.find({
    where: {
      id: id
    }
  }).then(function (user, error) {
    done(error, user);
  });
});

// passport.use(new BearerStrategy(
//   function(token, done) {
//     db.User.findOne({ token: token }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       return done(null, user, { scope: 'read' });
//     });
//   }
// ));
