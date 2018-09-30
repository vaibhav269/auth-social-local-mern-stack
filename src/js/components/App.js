import React,{Component} from 'react';
import Login from './Login';

class App extends Component{
    constructor(){
        super();        
    }

    render(){
        return(
            <div>
                <h1>LOGIN application</h1>
                <Login /> 
            </div>
        )
    }       

}
export default App;