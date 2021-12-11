const Local_Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sequelize = require('sequelize')
const passport = require('passport')
const UsersModel = require('../Model/UsersModel');

module.exports = function (passport) {

    passport.use(new Local_Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {

        UsersModel.findOne({ where: { email: email }}).then((user) => {

            if (user) {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (success) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { Message: 'Password Incorrect' });
                    }
                });
            }
        });
    }));

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        UsersModel.findByPk(id).then((user) => {
            done(null, user);
        }).catch((err) => {
            done(err, null);
        });
    });
}