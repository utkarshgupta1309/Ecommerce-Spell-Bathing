const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.get('/welcome', (req,res) =>
    res.render('welcome', {title: 'Welcome Page'}));

router.get('/', (req,res) => 
    res.render('home'));

router.get('/categories', (req,res) => 
    res.render('categories'));

router.get('/product_page', (req,res) => 
    res.render('product_page'));  

router.get('/products', (req,res) => 
    res.render('products_display')); 

router.get('/dashboard', ensureAuthenticated, (req,res) => 
    res.render('dashboard', {title: 'Login', name: req.user.fname}));
module.exports = router;