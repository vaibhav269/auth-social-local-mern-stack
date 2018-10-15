const fetch = require('node-fetch');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.post('/api/account/signinFacebook',function(req,res){
        console.log("i came here");
        let access_token = req.body.access_token;
        let app_id = '271317300381133';
        let app_secret = 'a799c00dea6f43950078f51f7e67d385';
        var long_access_token = '';
        fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${access_token}`)
            .then(resp=>resp.json())
            .then((json)=>{
                long_access_token = json.access_token;            
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
}