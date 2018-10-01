import React,{Component} from 'react';

class Signup extends Component{
    
    constructor(){
        super();
    }

    localSignup(){
        alert("sign me up");
    }
    
    render(){
        return(
            <div className="col-lg-3 mt-4 border border-dark" >
                
                <div className="row bg-dark p-1"
                    style={{color:"white",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bolder",fontSize:"150%"}}>
                    <p className="w-100 text-center m-0">Signup</p>
                </div>
                
                <div className="row justify-content-center pr-3 pl-3 mt-3">
                    <form className="w-100" onSubmit = {this.localSignup}>
                        <div className = "form-group" >
                            <label >Enter Username</label>
                            <input type = "text" className="form-control" name="username" />                        
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
                <p>Already have an account? <a href="/login">Login</a></p>
                <p>Or go <a href="/">home</a>.</p>

            </div>
        )
    }
}

export default Signup;