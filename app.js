const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const url = require('url')
//passport config
require('./config/passport')(passport);

//Connect to MONGODB
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://admin:ahana123@users.76e4z.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {})//Listen to requets only after db is connected
    .catch((err) => console.log(err));
    
//Set view engine
app.set('view engine', 'ejs')

//Express sessions middleware  
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//link CSS
app.use(express.static('public'));

//Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error= req.flash('error');

    next();
});


//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'))
app.use('/categories', require('./routes/categories.js'))
app.use('/payments', require('./routes/payment.js'))
app.use((req,res) => {
    res.status(404).render('404',{title: '404'});
})

app.listen(5000)