import React,{Component} from 'react';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

class App extends Component{
    constructor(){
        super();
        
        this.navNoSessionRouteData = [
                            {to:'/login',name:'Login',key:'r1'},
                            {to:'/signup',name:'signup',key:'r2'},
                            {to:'/',name:'Home',key:'r3'}
                        ];
        this.navNoSessionButtonData = [];


        this.navSessionRouteData = [
                            {to:'/profile',name:'Profile',key:'r1'},
                        ];                                
        this.navSessionButtonData = [
                            {onClick:this.logout,name:'Logout',key:'b1'}
                        ];
        
        this.state = {
            token : '',
            isLoading:false,
            navRouteData: this.navNoSessionRouteData,
            navButtonData : this.navNoSessionButtonData
        }
        this.isLoading = this.isLoading.bind(this);
        
    }

    logout(){
        alert('logged out');
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
                            navRouteData:this.navSessionRouteData,
                            navButtonData:this.navSessionButtonData
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
        let {isLoading,token,navRouteData,navButtonData} = this.state;

        if(isLoading === true){
            return (
                <p>Loading...</p>
            );
        }
        else{
            return(            
                <div>                                                                                                
                    <div className="container-fluid">
                        <div className="row ">
                            <Nav navRouteData = {navRouteData}  navButtonData = {navButtonData}/>
                        </div>
                                
                        <div className="row justify-content-center">
                            <Switch>
                                <Route exact path="/" component={Home} />                                        
                                <Route path = "/login" component={Login}/>
                                <Route path = "/signup" component={Signup}/>
                                <Route path = "/profile" component={Profile}/>
                            </Switch>
                        </div>
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
export default App;