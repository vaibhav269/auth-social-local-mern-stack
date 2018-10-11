import React,{Component} from 'react';
 
class LocalLogin extends Component{    
     constructor(){
         super();
         this.state = {
            isLoading:false,
            signinError:''            
        }
        this.localLogin = this.localLogin.bind(this);
     }
     
     localLogin(event){
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
        fetch('/api/account/signin',options)
        .then( res=>{
            res.json().then(
                (text)=>{                     
                    this.setState({isLoading:false});        
                    if(text.success == false){
                        this.setState({signinError:text.message});
                    }
                    else if(text.success == true){                        
                        try{
                            localStorage.token=text.token;                            
                            this.props.setToken(text.token);
                        }catch(err){
                            console.log("Error : can't stablish session",err);
                        }                                            
                    }
                }
            );
        })
    }

    render(){
        let {isLoading,signinError} = this.state;
        return(
            <div className="row justify-content-center pr-3 pl-3">
                
                <div className = "col-12">
                    <p className = "bg-danger text-white w-100 text-center"> {signinError} </p>
                </div>

                <form className="w-100" onSubmit = {this.localLogin}>
                    <div className = "form-group" >
                        <label >Enter Email</label>
                        <input type = "text" className="form-control" name="email" />
                    </div>

                    <div className = "form-group" >
                        <label >Enter password</label>
                        <input type = "password" className="form-control" name="password" />                        
                    </div>

                    <div className="form-group text-center">
                        <button type= "submit" className="btn btn-dark">Login</button>
                    </div>
                </form>
            </div>
        )
    }
 }

export default LocalLogin;