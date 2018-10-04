import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Signup extends Component{
    
    constructor(){
        super();
        this.state = {
            isLoading:false,
            signupError:''
        }
        this.localSignup = this.localSignup.bind(this);
    }

    localSignup(event){
        event.preventDefault();

        this.setState({isLoading:true});

        const formData = new FormData(event.target);
        let jsonObject = {};

        for (const [key, value]  of formData.entries()) {
            jsonObject[key] = value;
        }

        var data = new Blob([JSON.stringify(jsonObject,null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : data,
            mode : 'cors',
            cache : 'default'
        }
        fetch('http://localhost:3000/api/account/signup',options)
        .then( res=>{
            res.json().then(
                (text)=>{                     
                    this.setState({isLoading:false});                    
                    if(text.success == false){
                        this.setState({signupError:text.message});                        
                    }
                }
            );
        })
    }
    
    render(){
        let {isLoading,signupError} = this.state;
        return(            
            <div className="col-lg-3 mt-lg-5 border border-dark" >               
                <div className="row bg-dark p-1"
                    style={{color:"white",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bolder",fontSize:"150%"}}>
                    <p className="w-100 text-center m-0">Signup</p>
                </div>
                
                <div className = "row">
                    <p className = "bg-danger text-white w-100 text-center"> {signupError} </p>                
                </div>

                <div className="row justify-content-center pr-3 pl-3 mt-3">
                    <form className="w-100" onSubmit = {this.localSignup}>
                        <div className = "form-group" >
                            <label >Enter email</label>
                            <input type = "text" className="form-control" name="email" />                        
                        </div>

                        <div className = "form-group" >
                            <label >Enter password</label>
                            <input type = "password" className="form-control" name="password" />                        
                        </div>

                        <div className="form-group text-center">
                            <button type= "submit" className="btn btn-dark">Signup</button>
                        </div>
                    </form>
                </div>

                <hr className = "m-3"/>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <p>Or go <Link to="/">Home</Link>.</p>
                {
                    (isLoading)?(<p>Loading.....</p>):(null)
                }
            </div>
        )
    }
}

export default Signup;