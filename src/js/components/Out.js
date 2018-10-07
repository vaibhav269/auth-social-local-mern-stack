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
            isLoading:false                        
        }
        this.isLoading = this.isLoading.bind(this);
    }

    logout(){
        alert('logged out');
    }

    componentWillMount(){
        let {match} = this.props;
        console.log(match);
        this.navNoSessionRouteData = [
            {to:`${match.url}login`,name:'Login',key:'r1'},
            {to:`${match.url}signup`,name:'signup',key:'r2'},
            {to:`${match.url}`,name:'Home',key:'r3'}
        ];

        this.navNoSessionButtonData = [];
    }

    componentDidMount(){
        const tokenVar = localStorage.getItem('token');
        if(tokenVar == null){
            console.log('not logged in');
        }else{
            console.log('logged in');

            this.setState({
                isLoading:true
            });

            fetch('http://localhost:3000/api/account/verify?token='+tokenVar)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    this.setState({
                        token : tokenVar,
                    });
                }else{
                    console.log(json.message);
                }
                this.setState({
                    isLoading:false
                });
            });
        }
    }
    
    isLoading(){
        let {isLoading,token} = this.state;        
        let min = 5;
        let max = 10;
        let ram = Math.floor(Math.random() * (+max - +min)) + +min;
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
                        (ram>8)?<Redirect to={{pathname: '/In', state: {from: this.props.location}}} />:null
                    }   
                    <div className = "row">                                     
                        <Nav navRouteData = {this.navNoSessionRouteData}  navButtonData = {this.navNoSessionButtonData}/>
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
                { this.isLoading()}
            </div>
        )
    }
}

export default Out;