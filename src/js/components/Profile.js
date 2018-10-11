import React,{Component} from 'react';

class Profile extends Component{
    constructor(){
        super();
        this.state={                       
        }
    }
    
    componentWillMount(){
        const tokenVar = localStorage.getItem('token');
        fetch('/api/account/getUserData?token='+tokenVar)
            .then(res=>res.json())
            .then(json=>{
                if(json.success === true){
                    console.log(json.message.email);
                    this.setState({
                        email:json.message.email,
                        signUpDate:json.message.signUpDate
                    });
                    console.log(this.state);
                }
                else{
                    console.log('error occured');
                    alert(json.message);
                }
            });
    }

    render(){   
        let {email,signUpDate} = this.state;        
        return(
            <div className="row">
                <div className="col-12">
                    <div>email : {email}</div>
                    <div>signUpDate : {signUpDate}</div>
                </div>
            </div>
        )
    }
}

module.exports=Profile;