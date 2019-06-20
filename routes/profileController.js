const express = require('express');
const router = express.Router();
const session = require('express-session');
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 100,
  host            : '104.196.165.56',
  user            : 'teamDD',
  password        : 'BolajiRobertJovan2022',
  database        : 'KnowItAllSports'
});


router.use('/components', express.static('components'));

express().use(session({ secret: 'secret', cookie: { maxAge: 60000 }}))

// Welcome Page
//router.get('/', (req, res) => res.render('index'));


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