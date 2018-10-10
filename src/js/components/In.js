import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import Profile from './Profile';
import Nav from './Nav';

class In extends Component{    
    constructor(){
        super();        

        this.state = {
            token : '',
            navSessionButtonData :[],
            navSessionRouteData:[],
            isLoading:false            
        }
        this.isLoading = this.isLoading.bind(this);
    }

    logout(){
        alert("logged out");
    }

    componentDidMount(){
        let {match} = this.props;
        this.setState({
            navSessionRouteData : [                
                {to:`${match.url}`,name:'Profile',key:'r3'}
            ],
            navSessionButtonData : [{onClick:this.logout,name:'Logout',key:'b1'}],
            isLoading:true
        }) 

        const tokenVar = localStorage.getItem('token');
        if(tokenVar == null){
            this.setState({
                isLoading:false
            });
        }else{            
            fetch('http://localhost:3000/api/account/verify?token='+tokenVar)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    this.setState({
                        token : tokenVar,
                        isLoading:false
                    });                    
                }else{
                    this.setState({                 
                        isLoading:false,
                    });
                }
            });
        }
    }
    
    isLoading(){
        let {isLoading,token,navSessionButtonData,navSessionRouteData} = this.state;
        if(isLoading === true){
            return (
                <p>Loading...</p>
            );
        }
        else{
            let {match} = this.props            
            return(
                <div>
                    {
                        (token)?(null):<Redirect to={{pathname: '/In', state: {from: this.props.location}}} />
                    }
                    <div className = "row">
                        <Nav navRouteData = {navSessionRouteData}  navButtonData = {navSessionButtonData}/>
                    </div>
                        <div className="row justify-content-center">
                            <Switch>
                                <Route exact = {true} path={`${match.path}`} component={Profile} />                                
                            </Switch>
                        </div>
                </div>
            )
        }
    }


    render(){    
        return(
            <div>
                {this.isLoading()}
            </div>
        )
    }
}

export default In;