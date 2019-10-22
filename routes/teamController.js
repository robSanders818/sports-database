// Imports JS middleware
const express = require('express');
const router = express.Router();
const session = require('express-session');

const mysql = require('mysql');
const pool = require('./config.js');

router.use('/components', express.static('components'));


// Getting the string of the webpage
router.get('/:teamid', (req, res) => {
    teamid = req.params.teamid; // The Review JSON Object

    // Finds the user matching the id of the post
    pool.query('CALL team_info_by_id(?)', teamid, (error, results, fields) => {


        //if theres an error it redirects the user to the dashboard(for now)
        if (error) res.redirect('/dashboard');

        //if there are no posts it redirects the user to the dashboard(for now)
        if (results == null) {
            res.redirect('/dashboard');
        } else {
            var teamInfo = results[0];

            pool.query('CALL team_stats_by_id(?)', teamid, (error, results, fields) => {
                var statsInfo = results[0];
                pool.query('CALL all_batters_onteam(?,?)', [teamid, 2018], (error, results, fields) => {
                    var batters = results[0];
                pool.query('CALL all_pitchers_onteam(?,?)', [teamid, 2018], (error, results, fields) => {
                    var pitchers = results[0];
                pool.query('CALL is_user_following_team(?,?)', [req.session.user.username, teamid], (error, results, fields) => {
                    console.log(results[0].length)
                    if (results[0].length == 0) {
                        res.render('team.ejs', {
                            info: teamInfo[0],
                            stats: statsInfo,
                            follow: 'Follow',
                            batters: batters,
                            pitchers: pitchers
                        })
                    } else {
                        res.render('team.ejs', {
                            info: teamInfo[0],
                            stats: statsInfo,
                            follow: 'Unfollow',
                            batters: batters,
                            pitchers: pitchers
                        })
                    }
                })
            })
        })
            })
        }
    });
});


// Exports the JS middleware object
module.exports = router;
