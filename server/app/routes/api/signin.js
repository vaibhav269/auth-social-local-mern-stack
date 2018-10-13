const User = require('../../models/user');
const UserSession = require('../../models/userSession');
var bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '745747889746-u2rk5tn1b86veevlih319uv0iiuin4a0.apps.googleusercontent.com';
const CLIENT_SECRET = 'S2QzHZ5hvn0rOppDGwxMJE_d';
const REDIRECT_URI = 'http://localhost:3000';

async function verifyGoogle(token) {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID    
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return payload;  
}

module.exports = function(app){
    app.post('/api/account/signInGoogle',function(req,res,next){            
            const oauth2Client = new OAuth2Client(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
            var code = req.body.code; // the query param code
            oauth2Client.getToken(code, function(err, tokens) {           
              // Now tokens contains an access_token and an optional refresh_token. Save them.
                if(!err) {
                    verifyGoogle(tokens.id_token).then(payload=>{
                        
                        User.find({
                            email:payload['email']
                        },function(err,previousUsers){
                            if(err){
                                return res.send({
                                    success:false,
                                    message:'Error1 : serve error'
                                });
                            }
                            else if(previousUsers.length > 0 ){
                                const user = previousUsers[0];
                                const userSession = new UserSession();
                                userSession.userId = previousUsers[0]._id;
                                userSession.save(function(err,doc){
                                    if(err){
                                        console.log(err);
                                        return res.send({
                                            success:false,
                                            message:'Error:server error'
                                        });
                                    }
                                    else{
                                        return res.send({
                                            success:true,
                                            message:'Valid sign in',
                                            token:doc._id
                                        });
                                    }                                                        
                                });
                            }
                            
                            else{                            
                                const newUser = new User();
                                newUser.email = payload['email'];

                                newUser.googleProvider = tokens.refresh_token;
                                newUser.save((err,user) =>{
                                    if(err){
                                        return res.send({
                                            success:false,
                                            message:'Error2:serve error'
                                        });
                                    }
                                    const userSession = new UserSession();
                                    userSession.userId = user._id;
                                    userSession.save(function(err,doc){
                                        if(err){
                                            console.log(err);
                                            return res.send({
                                                success:false,
                                                message:'Error:server error'
                                            });
                                        }
                                        return res.send({
                                            success:true,
                                            message:'valid sign up',
                                            token:doc._id
                                        });

                                    });
                            });}
                        });
                    }).catch((err)=>{
                        return res.send({
                            success:false,
                            message:'Error : Some error occured'
                        })
                    })
                }
                else{
                    res.send({
                        success:false,
                        message:'Error: Token invalid'
                    });
                }
            });
    });


    app.post('/api/account/signup',function(req,res,next){
        const password = req.body.password;
        let email = req.body.email;
        console.log(req.body);
        if(!email){
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
              });
        }
        if (!password) {
            return res.send({
              success: false,
              message: 'Error: Password cannot be blank.'
            });
          }
        email = email.toLowerCase();
        email = email.trim();
        
        User.find({email:email},function(err,previousUser){
            if (err) {
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
            }
            else if (previousUser.length > 0) {
                return res.send({
                  success: false,
                  message: 'Error: Account already exist.'
                });
              }
              
              
              const newUser = new User();
              newUser.email = email;
              newUser.password = newUser.generateHash(password);            
              
              newUser.save((err, user) => {
                if (err) {
                  return res.send({
                    success: false,
                    message: 'Error: Server error'
                  });
                }
                return res.send({
                  success: true,
                  message: 'Signed up'
                });
              });
            });
        
    });
   
    app.post('/api/account/signin',function(req,res,next){
        const password = req.body.password;
        let email = req.body.email;
        if(!email){
            return res.send({
                success:false,
                message:'Error:Email connot be blank'
            });
        }
        if(!password){
            return res.send({
                success:false,
                message:'Error:Password cannot be blank'
            });
        }

        email = email.toLowerCase();
        email = email.trim();

        User.find({
            email:email
        },function(err,users){
            if(err){
                console.log('err 2:',error);
                return res.send({
                    success:false,
                    message:'Error:server error'
                });
            }
            if(users.length != 1 ){
                return res.send({
                    success:false,
                    message:'Error:Invalid'
                });
            }

            const user = users[0];
            if(!user.validatePassword(password)){
                return res.send({
                    success:false,
                    message:'Error:Invalid credentials'
                });
            }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save(function(err,doc){
                if(err){
                    console.log(err);
                    return res.send({
                        success:false,
                        message:'Error:server error'
                    });
                }
                return res.send({
                    success:true,
                    message:'Valid sign in',
                    token:doc._id
                });

            });

        });
    });

    app.get('/api/account/logout',function(req,res,next){
        const {token} = req.query;
        UserSession.findOneAndUpdate({
            _id:token,
            isDeleted:false
        },{
            $set:{
                isDeleted:true
            }
        },null,function(err,sessions){
            if(err){
                console.log(err);
                return res.send({
                    success:false,
                    message:'Error:Serve error'
                });
            }
            return res.send({
                success:true,
                message:'Logged Out Successfully'
            });
        });
    });

    app.get('/api/account/verify',function(req,res,next){
        const {token} = req.query;        
        UserSession.find({
            _id:token,
            isDeleted:false
        },function(err,sessions){
            if(err){
                console.log(err);
                return res.send({
                    success:false,
                    message:'Error: Serve error'
                });
            }
            if(sessions.length != 1){
                return res.send({
                    success:false,
                    message:'Error : Something went wrong'
                });
            }else{
                //User is valid
                return res.send({
                    success: true,
                    message:'User is valid'
                });
            }
        });

    });

    app.get('/api/account/getUserData',function(req,res,next){
        const {token} = req.query;
        UserSession.find({
            _id:token,
            isDeleted:false
        },function(err,userSessions){
            if(err){
                console.log(err);
                return res.send({
                    success:false,
                    message:'Error:serve error'
                });
            }
            if(userSessions.length != 1){                
                return res.send({
                    success:false,
                    message:'Error:Invalid'
                });
            }
            
            const userSession = userSessions[0];

            User.find({
                _id:userSession.userId,
                isDeleted:false
            },function(err,users){
                if(err){
                    return res.send({
                       success:false,
                       message:'Error:No user found' 
                    });
                }
                if(users.length != 1){                    
                    return res.send({
                        success:false,
                        message:'Error:Invalid'
                    });
                }
                
                let user = {
                    email:users[0].email,
                    signUpDate:users[0].signUpDate
                }
                return res.send({
                    success:true,
                    message:user
                });
            });
        });

    });

}