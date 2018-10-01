import React,{Component} from 'react';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';

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
    }

    render(){
        return(
            <Router>
                <div className="container-fluid">
                    <div className="row">
                        <Nav />
                    </div>    
                    
                    <div className="row justify-content-center">
                        <Switch>                                                                                                              
                            <Route exact path="/" component={Home} />
                            <Route path = "/login" component={Login}/>
                        </Switch>   
                    </div>
                </div>
            </Router>         
        )
    }       

}
export default App;