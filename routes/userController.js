var express    = require("express");
//const app = express();
const router = express.Router();

const conn = require('mysql');
//const conn = mysql.createPool();

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
      "email":req.body.email,
      "password":req.body.password
    }

    if(users.password == req.body.password){
    conn.query('Call add_user ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
    });
} else {
    res.send({
        "code":300,
        "failed":"Either the passwords don't match or the emails don't match"
    });
}
});

module.exports = router;
  