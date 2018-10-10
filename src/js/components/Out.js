import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';

class Out extends Component{
    constructor(){
        super();        
        
        this.state = {
            token : '',
            navNoSessionButtonData :[],
            navNoSessionRouteData:[],
            isLoading:false            
        }
        this.isLoading = this.isLoading.bind(this);
    }

    logout(){
        alert('logged out');
    }

    componentDidMount(){
        let {match} = this.props;
        this.setState({
            navNoSessionRouteData : [
                {to:`${match.url}login`,name:'Login',key:'r1'},
                {to:`${match.url}signup`,name:'signup',key:'r2'},
                {to:`${match.url}`,name:'Home',key:'r3'}
            ],
            navNoSessionButtonData : [],
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
        let {isLoading,token,navNoSessionButtonData,navNoSessionRouteData} = this.state;
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
                        (token)?<Redirect to={{pathname: '/In', state: {from: this.props.location}}} />:(null)
                    }
                    <div className = "row">
                        <Nav navRouteData = {navNoSessionRouteData}  navButtonData = {navNoSessionButtonData}/>
                    </div>
                        <div className="row justify-content-center">
                            <Switch>
                                <Route exact = {true} path={`${match.path}`} component={Home} />
                                <Route path={`${match.path}login`} component={Login}/>
                                <Route path={`${match.path}signup`} component={Signup}/>
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

export default Out;