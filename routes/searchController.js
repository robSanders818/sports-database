const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const pool = require('./config.js');

router.use('/components', express.static('components'));


router.post('/', (req, res) => {
    const searchInput = req.body.search;
    pool.query('CALL find_team_info(?)', [searchInput], (error, results, fields) => {
        if(results.length > 0){
            console.log(results[0][0]);
        res.render('search.ejs', {
            teams: results
        });
        } else {
            req.flash('error_msg','Could not find any teams with this name');
            //req.redirect('/home');
        }
    });
});

module.exports = router;