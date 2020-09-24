const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const url = require('url');


router.get('/soaps', (req,res) => {
    res.render('soaps');
})

router.get('/soaps/:id', (req,res) => {
    res.render('product')
})
router.get('/bathBombs', (req,res) => {
    res.render('bathBombs');
})
router.get('/bodyButter', (req,res) => {
    res.render('bodyButter');
})

router.get('/saltSoaks', (req,res) => {
    res.render('saltSoaks');
})

router.get('/special', (req,res) => {
    res.render('special');
})


module.exports = router;
