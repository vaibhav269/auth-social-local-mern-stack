import React,{Component} from 'react';

class Profile extends Component{
    constructor(){
        super();        
    }
    
    componentDidMount(){
        const tokenVar = localStorage.getItem('token');
        fetch('/api/account/getUserData?token='+tokenVar)
            .then(res=>res.json())
            .then(json=>{
                console.log(json);
            });
    }

    render(){        
        return(
            <div className="row">
                <div className="col-12">
                    <div>Name : Vaibhav</div>
                    <div>Work : Developing Web Applications</div>
                </div>
            </div>
        )
    }
}

module.exports=Profile;