import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark navbar-expand-sm bg-dark col-12">
                <ul className="navbar-nav">
                    <li className="navbar-brand"> Node Auth</li>
                    <li className="nav-item"> <Link to = '/login' className="nav-link"> Login</Link> </li>
                    <li className="nav-item"> <Link to = '/signup' className="nav-link"> Signup</Link> </li>
                    <li className="nav-item"> <Link to = '/' className="nav-link"> Home</Link> </li>
                </ul>
            </nav>
        )
    }
}
export default Nav;