import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import LoginGoogle from './LoginGoogle';
import config from '../../JSON/config.json';
import '../../css/login.css';
import LocalLogin from './LocalLogin';
import {Link} from 'react-router-dom';


class Login extends Component{
    constructor(){
        super();           
    }
 
    facebookResponse(response){
        const tokenBlob = new Blob([JSON.stringify({access_token:
        response.accessToken},null,2)],{type:'application/json'});
        console.log(response);
        const options = {
            method: 'POST',
            body :tokenBlob,
            mode:'cors',
            cache : 'default'
        };
        fetch('/hello',options)
            .then( r=>{
                r.json().then((text)=>{console.log(text)})                
        })
    }

    onFailure(error){
        alert("error");
    }

    render(){                            
        return (
            <div className="col-lg-3 mt-lg-5 border border-dark" >      
                <div className="row bg-dark p-1" 
                    style={{color:"white",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bolder",fontSize:"150%"}}>
                    <p className="w-100 text-center m-0">Login</p>
                </div>        
                <div className="row justify-content-around mt-3">
                    <FacebookLogin 
                        appId = {config.FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields = "name,email,picture"
                        callback = {this.facebookResponse}
                        cssClass = "facebook-login-button p-2"
                        textButton = "Facebook"
                    /> 
                     <LoginGoogle 
                         setToken = {this.props.setToken} 
                         getToken = {this.props.getToken}
                     />
                </div>                    
                <hr/>

                <LocalLogin 
                    setToken = {this.props.setToken} 
                    getToken = {this.props.getToken} 
                />
                
                <hr/>
                
                <p>Doesn't have an account? <Link to="/signup">Signup</Link></p>
                <p>Or go <Link to="/">Home</Link>.</p>
            </div>
        );
        
    }
}
export default Login;