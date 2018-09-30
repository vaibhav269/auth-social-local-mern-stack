import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../../JSON/config.json';


class Login extends Component{
    constructor(){
        super();
        this.state = {isAuthenticated:false,user:null,token:''}
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.setState({isAuthenticated:false,token:'',user:null})
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
        let content = this.state.isAuthenticated?
        (
            <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
        ):
        (
            <div>              
                <FacebookLogin appId = {config.FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields = "name,email,picture"
                            callback = {this.facebookResponse}                
                />
                 <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </div>
        );
        return (
            <div className="App">
                {content}
            </div>
        );
        
    }
}
export default Login;