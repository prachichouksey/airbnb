import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationForApiService from './AuthenticationForApiService.js'
import { API_URL } from '../../Constants'
import axios from 'axios';

class HeaderComponent extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            date: ''
        }
        
        
    }
    async componentDidMount() {
        try {
          setInterval(async () => {
            axios
            .get(API_URL + "/admin/time", {
                headers: { "Content-Type": "application/json" }
            }).then(response => {
                
                if (response.status === 200) {
                    this.setState({

                       date: response.data
                    })
                   

                }
                else {
                   
                }
            })
            .catch(err => {
                console.log(err);
               

            });

           
          }, 3000);
        } catch(e) {
          console.log(e);
        }
  }
    render() {
        const isUserLoggedIn = AuthenticationForApiService.isUserLoggedIn();
        

        return (
            <header>
                {/* <nav className="navbar navbar-expand-md"> */}
                <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                    <div><img src="logo.png" height="40" width="55" alt="Logo"></img> <a href="/" className="navbar-brand">Open Home</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/OpenHome">Home</Link></li>}
                       
                        <li><Link className="nav-link" to="">Current Environment: {this.state.date}</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isUserLoggedIn && <li><Link className="nav-link" to="/signup"  onClick={AuthenticationForApiService.logout}>Sign Up</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login" >Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationForApiService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent