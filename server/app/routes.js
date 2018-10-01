module.exports = function(app,passport){
    app.post('/local-login',function(req,res){        
        res.send("Login successfull");
    });

    app.post('/local-signup',function(req,res){
        res.send("signup successfull");
    })
}