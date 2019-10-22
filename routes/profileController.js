const express = require('express');
const router = express.Router();
const session = require('express-session');
const mysql = require('mysql');
const pool = require('./config.js');
 


router.use('/components', express.static('components'));

express().use(session({ secret: 'secret', saveUninitialized: true,resave: false, cookie: { maxAge: 60000 }}))

router.use('/account', (req, res) => res.render('account'));

// Welcome Page
//router.get('/', (req, res) => res.render('index'));

router.post('/update', (req, res) => {
    var newEmail = req.body.email;
    var newPassword = req.body.password;
    pool.query('CALL update_user(?,?,?)',[req.session.user.username, newPassword, newEmail], (errors, results, fields) => {
        if(errors){
            req.flash('error_msg','Logged out for security reasons unable to change user data due to error');
            res.redirect('/home');
        } else {
            req.flash('success_msg','Logged out for security reasons, account information update was successful');
            res.redirect('/home');
        }
    })
})


router.post('/follow', (req, res) => {
    var teamid = req.body.teamid;
    console.log(teamid);
    pool.query('CALL is_user_following_team(?,?)',[req.session.user.username, teamid],(errors, results, fields) => {
        if(errors){
            console.log('an error hs occurred:' + errors);
        }
        if(results[0].length > 0){
            //res.redirect('/dashboard');
            pool.query('CALL delete_team_following(?,?)',[req.session.user.username, teamid], (errors, results, fields) => {
                if(errors){
                    console.log("error occured" + errors);
                } else {
                    res.redirect('/dashboard');
                }
            })

        } else {
            pool.query('CALL add_team_following(?,?)',[req.session.user.username, teamid], (errors, results, fields) => {
                if(errors){
                    console.log("error occured" + errors);
                } else {
                    res.redirect('/dashboard');
                }
            })
        }
    });
});

module.exports = router;