module.exports = function(app,passport){
    app.post('/local-login',function(req,res){
        console.log("Came here")    
        res.send("hello");
    });   
}