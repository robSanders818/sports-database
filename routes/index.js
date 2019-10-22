const express = require('express');
const router = express.Router();
const session = require('express-session');
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : '104.196.165.56',
  user            : 'teamDD',
  password        : 'BolajiRobertJovan2022',
  database        : 'KnowItAllSports'
});


router.use('/components', express.static('components'));

express().use(session({ secret: 'secret', saveUninitialized: true,resave: false,cookie: { maxAge: 60000 }}))

// Welcome Page
router.get('/', (req, res) => res.render('index'));


// Dashboard
router.get('/dashboard', (req, res) =>{
    if(req.session.user == null){
        req.flash('error_msg','To use this you must be logged in');
        res.redirect('/index');
    }
    //posts = [];
    userdata = req.session.user;
  pool.query('CALL teams_user_follows(?)',[userdata.username], (error, results, fields)=>{
      console.log(results[0]);
    res.render('dashboard', {
      user: userdata,
      following: results[0]
    });
  });
});

module.exports = router;