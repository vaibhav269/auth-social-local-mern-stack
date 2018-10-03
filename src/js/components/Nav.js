import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component{
    render(){
        return(
            <div className="w-100">

                 <nav className="navbar navbar-dark navbar-expand-lg bg-dark justify-content-between" >

                    <Link to = '/' className="navbar-brand" style={{outline:"none"}} >Node Auth</Link>
                    
                    <button style={{outline:"none",cursor:"pointer"}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ">
                            <li className="nav-item text-center" > <Link style={{outline:"none"}} to = '/login' className="nav-link"> Login</Link> </li>
                            <li className="nav-item text-center" > <Link style={{outline:"none"}} to = '/signup' className="nav-link"> Signup</Link> </li>
                            <li className="nav-item text-center" > <Link style={{outline:"none"}} to = '/' className="nav-link"> Home</Link> </li>
                        </ul>
                    </div>

                </nav>
            </div>
        )
    }
}
export default Nav;