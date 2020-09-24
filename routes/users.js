const express = require('express')
const router = express.Router();
const User = require('../modals/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')


//Login Page
router.get('/login', (req,res) => {
    res.render('login');
})

//Register Page
router.get('/register', (req,res) => {
    res.render('register', { title: 'Register'});
})
// Register new users
router.post('/register', (req,res) => {


    const { fname, lname,email, pass, cpass} = req.body;
    let errors = [] //list of errors

    //check passwords match
    if(pass !== cpass){
        errors.push({ msg : 'Passwords do not match'})
    }

    //check password length
    if(pass.length < 6){
        errors.push({ msg: 'Passwords must be 6 characters long'})
    }
    //Email id Validation
    if(errors.length > 0){
        res.render('register', {
            title: 'Check your details', 
            errors,
            fname,
            lname,
            email,
        })

    } else{
        //Validation Pass
        User.findOne({email: email})
            .then(user => {
                if(user){
                    errors.push({msg : 'User already exists'})
                    res.render('register', {
                        title: 'Check your details', 
                        errors,
                    });
                }
                else{
                    const newUser = new User({
                        fname,lname,email,pass
                    });
                    //hash passwords
                    bcrypt.genSalt(10, ( err, salt) => {
                        bcrypt.hash(newUser.pass, salt, (err,hash) => {
                            if(err) throw err;
                            //Set password to hashed
                            newUser.pass = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'User Registered, You can now login');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        })
                    })
                 
                }
            });
    }
})

//Login Page
router.get('/login', (req,res) => {
    res.render('login');
})
//login handle
router.post('/login', (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req,res,next);
})

//logout handle
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg', ' You logged out');
    res.redirect('/users/login');
})
module.exports = router;