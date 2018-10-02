"use strict";

require("./mongoose")();
var passport = require("passport");
var TwitterTokenStrategy = require("passport-twitter-token");
var User = require("mongoose").model("User");
var FacebookTokenStrategy = require("passport-facebook-token");
var GoogleTokenStrategy = require("passport-google-token").Strategy;
var config = require("./config");

module.exports = function() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret
      },
      function(accessToken, refreshToken, profile, done) {
        User.upsertGoogleUser(accessToken, refreshToken, profile, function(
          err,
          user
        ) {
          return done(err, user);
        });
      }
    )
  );
};
