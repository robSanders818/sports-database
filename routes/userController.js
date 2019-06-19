var express    = require("express");
//const app = express();
const router = express.Router();
const flash = require('connect-flash');

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


router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));



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
        "Yo are now registered and can log in"
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
router.post('/register', (req, res) => {
  var user={
    "username":req.body.username,
    "password":req.body.password
  }

  pool.query('Call login(?,?)',[user.username,user.password], (err, res, fields) => {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      }) 
    } else if(fields.length < 1) {
      res.flash("error_msg", "Either your password is wrong or your username doesnt exist");
      res.redirect('/user/register');
    } else {
      console.log("login successful");
    }
  })
});

module.exports = router;
  