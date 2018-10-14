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
require('./server/app/routes/api/signin.js')(app,passport) //loading routes 
app.post('/hello',function(req,res){
    console.log("i came here");
    let access_token = req.body.access_token;
    let app_id = '271317300381133';
    let app_secret = 'a799c00dea6f43950078f51f7e67d385';

    fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${access_token}`)
        .then(res=>res.json())
        .then((json)=>{
            console.log(json)
        })
        .catch(
            (err)=>{console.log(err)}
        )
    // https.get(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${access_token}`, (resp) => {
    // let data = '';

    // // A chunk of data has been recieved.
    // resp.on('data', (chunk) => {
    //     data += chunk;
    // });

    // // The whole response has been received. Print out the result.
    // resp.on('end', () => {
    //     let access = JSON.parse(data);
    //     let long_lived_access_token = access.access_token;
    //     let expiry =  access.expires_in;
    //     console.log(long_lived_access_token);
    //     console.log(expiry);
    //     res.send({
    //         success:true,
    //         message:'token verified'
    //     })
    // });

    // }).on("error", (err) => {
    //     res.send({
    //         success:false,
    //         message:'Some error occured'
    //     })
    //     console.log("Error: " + err.message);
    // });
});

//launch============================================================================
app.listen(port,function(){
    console.log("Server started");
});
