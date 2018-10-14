import React,{Component} from 'react';
import { GoogleLogin } from 'react-google-login';
import config from '../../JSON/config.json';

export default class LoginGoogle extends Component{
    constructor(){
        super();
    }

    googleResponse(response){
        console.log(response);
        const tokenBlob = new Blob([JSON.stringify({code:
        response.code},null,2)],{type:'application/json'});
        const options = {
            method: 'POST',
            body :tokenBlob,
            mode:'cors',
            cache : 'default'
        };
        fetch('/api/account/signInGoogle',options)
            .then(r=>{
                r.json()
                    .then( (text) => console.log(text))
        })
    }
    render(){
        return(
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Google"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
                responseType = 'code'
                accessType = 'offline'
                className="google-login-button p-3"               
            />
        )
    }
}