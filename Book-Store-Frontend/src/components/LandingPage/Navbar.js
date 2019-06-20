import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/home' })
    }
    render(){
  
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                       {/* <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li> */}
                </ul>
            );
        }else{
 
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        {/* <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li> */}
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="/home">Book Store App</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/home">Home</Link></li>
                        <li><Link to="/create">Add a Book</Link></li>
                        <li><Link to="/delete">Delete a Book</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;