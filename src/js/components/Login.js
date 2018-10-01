import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../../JSON/config.json';
import '../../css/login.css';
import LocalLogin from './LocalLogin';

class Login extends Component{
    constructor(){
        super();           
    }
 
    facebookResponse(response){
        const tokenBlob = new Blob([JSON.stringify({access_token:
        response.accessToken},null,2)],{type:'application/json'});
        const options = {
            method: 'POST',
            body :tokenBlob,
            mode:'cors',
            cache : 'default'
        };
        fetch('http://localhost:3000/hello',options)
            .then( r=>{
                r.json().then((text)=>{console.log(text)})
                // const token = r.headers.get('x-auth-token');          
                //     r.json().then(user => {
                //         if(token){
                //             this.setState({isAuthenticated:true,user,token})
                //         }
                //     });
        })
    }

    googleResponse(response){
        const tokenBlob = new Blob([JSON.stringify({access_token:
            response.accessToken},null,2)],{type:'application/json'});
            const options = {
                method: 'POST',
                body :tokenBlob,
                mode:'cors',
                cache : 'default'
            };
            fetch('http://localhost:3000/api/v1/auth/google',options)
                .then( r=>{
                    const token = r.headers.get('x-auth-token');          
                        r.json().then(user => {
                            if(token){
                                this.setState({isAuthenticated:true,user,token})
                            }
                        });
            })
    }

    onFailure(error){
        alert("error");
    }

    render(){                            
        return (
            <div className="col-lg-3 mt-4 border border-dark" >      
                <div className="row bg-dark p-1" 
                    style={{color:"white",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bolder",fontSize:"150%"}}>
                    <p className="w-100 text-center m-0">Login</p>
                </div>        
                <div className="row justify-content-around mt-3">
                    <FacebookLogin appId = {config.FACEBOOK_APP_ID}
                                autoLoad={false}
                                fields = "name,email,picture"
                                callback = {this.facebookResponse}
                                cssClass = "facebook-login-button p-2"
                                textButton = "Facebook"
                    />
                    <GoogleLogin
                            clientId={config.GOOGLE_CLIENT_ID}
                            buttonText="Google"
                            onSuccess={this.googleResponse}
                            onFailure={this.googleResponse}
                            className="google-login-button p-2"
                    />
                </div> 
                
                <div className="row justify-content-center pt-3 pb-3 text-dark" >
                    ----------------or----------------
                </div>               

                <LocalLogin />

            </div>
        );
        
    }
}
export default Login;