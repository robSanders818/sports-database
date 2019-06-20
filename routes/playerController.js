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
router.get('/:playerid', (req, res) => {
    playerid = req.params.playerid; // The Review JSON Object

    // Finds the user matching the id of the post

    pool.query('CALL player_stats(?)', playerid, (error, results, fields) => {


        //if theres an error it redirects the user to the dashboard(for now)
        if (error) res.redirect('/dashboard');

        //if there are no posts it redirects the user to the dashboard(for now)
        if (results == null) {
            res.redirect('/dashboard');
        } else {
            var playerStats = results[0];

            pool.query('CALL get_player_name(?)', playerid, (error, results, fields) => {
                    console.log(results[0].length)

                        res.render('player.ejs', {
                            playerStats: playerStats,
                            fields: fields[0],
                            playerName: results[0]
                        })
                    })
                    }
});
})


// Exports the JS middleware object
module.exports = router;
