import React,{Component} from 'react';
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';
import config from '../../JSON/config.json';
import '../../css/login.css';
import LocalLogin from './LocalLogin';
import {Link} from 'react-router-dom';


class Login extends Component{
    constructor(){
        super();           
    }
    render(){                            
        return (
            <div className="col-lg-3 mt-lg-5 border border-dark" >      
                <div className="row bg-dark p-1" 
                    style={{color:"white",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bolder",fontSize:"150%"}}>
                    <p className="w-100 text-center m-0">Login</p>
                </div>        
                <div className="row justify-content-around mt-3">
                    <LoginFacebook
                         setToken = {this.props.setToken} 
                         getToken = {this.props.getToken}
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