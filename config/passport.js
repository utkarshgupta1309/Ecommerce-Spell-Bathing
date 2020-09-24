const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//User Modal
const User = require('../modals/user');
const passport = require('passport');

module.exports = function(passport){
    passport.use(
        new localStrategy({ usernameField: 'email', passwordField: 'pass'}, (email,pass, done) => {
            //Match username
            User.findOne({ email: email})
                .then( user => {
                    if(!user){
                        return done(null, false, {message: 'Email not registered'})
                    }
                    //Match passwords
                    bcrypt.compare(pass, user.pass, (err,isMatch) => {
                        if(err) throw err;
                        if(isMatch){
                            return done(null, user);    
                        }
                        else{
                            return done(null, false, { message: 'Password incorrect'})
                        }
                    });
                })
                .catch(err => console.log(err)
                );
        })
    );

    passport.serializeUser((user,done) => {
        done(null,user.id);
    });

    passport.deserializeUser((id,done) => {
        User.findById(id, (err,user) => {
            done(err,user);
        });
    });

}