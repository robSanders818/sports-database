// Imports JS middleware
const express = require('express');
const router = express.Router();
const session = require('express-session');

const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '104.196.165.56',
    user: 'teamDD',
    password: 'BolajiRobertJovan2022',
    database: 'KnowItAllSports'
});

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
                pool.query('CALL is_user_following_team(?,?)', [req.session.user.username, teamid], (error, results, fields) => {
                    console.log(results[0].length)
                    if (results[0].length == 0) {
                        res.render('team.ejs', {
                            info: teamInfo[0],
                            stats: statsInfo,
                            follow: 'Follow'
                        })
                    } else {
                        res.render('team.ejs', {
                            info: teamInfo[0],
                            stats: statsInfo,
                            follow: 'Unfollow'
                        })
                    }
                })
            })
        }
    });
});


// Exports the JS middleware object
module.exports = router;
