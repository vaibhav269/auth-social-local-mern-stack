var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./server/config/db.js');

//configuration=================================================================
//database connection

mongoose.connect(configDB.url,{useNewUrlParser:true});



//for rendering react js
app.use(express.static('dist')); 

//set up express
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser());    //reading cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//for passport
app.use(session({secret:'shhhhh'})); //session secret
app.use(passport.initialize());
app.use(passport.session());    //persistent login sessions
app.use(flash()); //for flash messages stored in session



//routes==========================================================================
require('./server/app/routes/api/signin.js')(app,passport) //loading routes 
app.post('/hello',function(req,res){
    console.log(req.body);
    var obj = {
        name:"vaibhav",
        roll : "2"
    }
    res.send(obj);
});

//launch============================================================================
app.listen(port,function(){
    console.log("Server started");
});
