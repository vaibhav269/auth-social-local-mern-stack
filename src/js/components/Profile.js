import React,{Component} from 'react';

class Profile extends Component{
    constructor(){
        super();        
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