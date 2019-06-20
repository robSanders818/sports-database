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

express().use(session({ secret: 'secret', cookie: { maxAge: 60000 }}))

// Welcome Page
router.get('/', (req, res) => res.render('index'));


// Dashboard
router.get('/dashboard', (req, res) =>{
    //posts = [];
    userdata = req.session.user;
  //pool.query({user_id: req.user._id.toString()}, (req, posts)=>{
    res.render('dashboard', {
      user: userdata,
    });
  //});
});

module.exports = router;