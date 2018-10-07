import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

class In extends Component{    
    render(){
        return(
            <div>
                <h1>In Component !!</h1>
            </div>
        )
    }
}

export default In;