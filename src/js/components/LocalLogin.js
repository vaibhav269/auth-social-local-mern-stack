import React,{Component} from 'react';
 
class LocalLogin extends Component{    
     constructor(){
         super();
     }
     
     localLogin(event){
        event.preventDefault();
        var formData = new Blob([JSON.stringify({formData:new FormData(event.target)},null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : formData,
            mode : 'cors',
            cache : 'default'
        }
        fetch('http://localhost:3000/local-login',options)
        .then( res=>{
            res.text().then(
                (text)=>{ console.log(text);}
            );
        })
    }

    render(){
        return(
            <div className="row justify-content-center pr-3 pl-3">
                <form className="w-100" onSubmit = {this.localLogin}>
                    <div className = "form-group" >
                        <label >Enter Username</label>
                        <input type = "text" className="form-control" name="username" />                        
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