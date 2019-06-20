var express    = require("express");
//const app = express();
const router = express.Router();
const flash = require('connect-flash');
//const session = require('express-session');

const session = require('express-session');

const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : '104.196.165.56',
  user            : 'teamDD',
  password        : 'BolajiRobertJovan2022',
  database        : 'KnowItAllSports'
});

//route to handle user registration
//router.post('/register',login.register);
//router.post('/login',login.login)

//router.render()
// Login Page

router.use('/components', express.static('components'));


router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));


express().use(session({ secret: 'secret', cookie: { maxAge: 60000 }}))

// Handles register
router.post('/register', (req, res) => {
    // console.log("req",req.body);
    var today = new Date();
    var users={
      "username":req.body.username,
      "password":req.body.password,
      "email":req.body.email
    }

    if(users.password == req.body.password){
    pool.query('CALL add_user(?,?,?)',[users.username,users.password,users.email], (error, results, fields) => {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      req.flash(
        'success_msg',
        "You are now registered and can log in"
          );

          res.redirect('/user/login');
    }
    });
} else {
    res.send({
        "code":300,
        "failed":"Either the passwords don't match or the emails don't match"
    });
}
});

// Handles login
router.post('/login', (req, res) => {
  var user={
    "username":req.body.username,
    "password":req.body.password
  }

  pool.query('CALL login(?,?)',[user.username,user.password], (err, results, fields) => {
    if (err) {
      console.log("error ocurred",err);
      res.send({
        "code":400,
        "failed":"error ocurred"
      }) ;
    } else if(results[0].length < 1) {
      req.flash("error_msg", "Either your password is wrong or your username doesnt exist");
      res.redirect('/user/login');
    } else {
      console.log("login successful");
      //sess.username = results[0][0]; 
      req.session.user = results[0][0];
      res.render('dashboard', {
        user: results[0][0]
      });
    }
  })
});

router.get('/logout',(req, res) => {
  req.flash("success_msg", "You have successfully logged out");
  res.redirect('/user/login');
});

module.exports = router;
  