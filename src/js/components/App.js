import React,{Component} from 'react';
import Home from './Home';

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
                <div>
                    <Switch>                                                          
                        <Route exact path="/" component={Home} />
                    </Switch>   
                </div>
            </Router>         
        )
    }       

}
export default App;