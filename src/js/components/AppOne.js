import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import In from '../components/In';
import Out from '../components/Out';

class AppOne extends Component{
    constructor(){
        super();
        this.state = {            
            isLoading:false
        }
        this.isLoading = this.isLoading.bind(this);
    }
    
    componentDidMount(){
        this.setState({isLoading:false});
    }

    isLoading(){
        let {isLoading} = this.state;

        if(isLoading === true){
            return (
                <p>Loading...</p>
            );
        }
        else{
            return(                
                    <div className="container-fluid">
                        <Switch>                            
                            <Route path='/Out' component = {Out} />
                            <Route path='/In' component = {In} />
                            <Route path='/' component = {Out} />
                        </Switch>
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

export default AppOne;