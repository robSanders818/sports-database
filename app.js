var express    = require("express");
//var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
var app = express();
const session = require('express-session');
const flash = require('connect-flash');


//app.use(bodyParser.json());


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

var sess;

app.use('/', require('./routes/index'));


  // Connect flash
app.use(flash());

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '104.196.165.56',
  user     : 'teamDD',
  password : 'BolajiRobertJovan2022',
  database : 'KnowItAllSports'
}); // Must remember to enter in the correct name

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});


//Routes
app.use('/home', require('./routes/index'));
app.use('/user',require('./routes/userController'));
app.use('/team',require('./routes/teamController'));
app.use('/search',require('./routes/searchController'));
app.use('/profile',require('./routes/profileController'));
app.use('/player',require('./routes/playerController'));

//app.use('/login',login.login)


var router = express.Router();

/*
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});*/

const PORT = process.env.PORT || 5000;

//app.use('/api', router);
// Port forwards the application
app.listen(PORT, console.log(`Server started on port ${PORT}`));