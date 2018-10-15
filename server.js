var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
const fetch = require('node-fetch');

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
require('./server/app/routes/api/signin.js')(app);
require('./server/app/routes/api/signup.js')(app);
require('./server/app/routes/api/getUserData.js')(app);
require('./server/app/routes/api/verify.js')(app);
require('./server/app/routes/api/signInGoogle.js')(app);
require('./server/app/routes/api/logout.js')(app);

app.post('/hello',function(req,res){
    console.log("i came here");
    let access_token = req.body.access_token;
    let app_id = '271317300381133';
    let app_secret = 'a799c00dea6f43950078f51f7e67d385';

    fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${access_token}`)
        .then(resp=>resp.json())
        .then((json)=>{
            let long_access_token = json.access_token;            
            return fetch(`https://graph.facebook.com/me?access_token=${long_access_token}&fields=email`)
        })
        .then((resp)=>resp.json())
        .then((json)=>{
            console.log(json);
        })
        .catch(
            (err)=>{console.log(err)}
        )
});

//launch============================================================================
app.listen(port,function(){
    console.log("Server started");
});
