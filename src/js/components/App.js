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
        this.state = {
            token : '',
            isLoading:false
        }
        this.isLoading = this.isLoading.bind(this);
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
                            token : tokenVar
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

        if(isLoading === true){
            return (
                <p>Loading...</p>
            );
        }
        else{
            return(            
                <Router>
                    {
                        (token) ? (
                            <Profile/>
                        ):(
                            <div className="container-fluid">
                                <div className="row ">
                                    <Nav/>
                                </div>
                                
                                <div className="row justify-content-center">
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route path = "/login" component={Login}/>
                                        <Route path = "/signup" component={Signup}/>
                                    </Switch>
                                </div>
                            </div>
                        )
                    }                
                </Router>
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