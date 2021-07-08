import React,{Component} from 'react';
import './App.css';
import Dashboard from './Components/Dashboard'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Header from './UpAndDown.js/Header'
import Footer from './UpAndDown.js/Footer'
import UserSignIn from './Auth/UserSignIn'
import UserLogin from './Auth/UserLogin'



class App extends Component{

    render(){
        return (
            <div className="App">
            <Router>
              <div>
           
                <Switch>
                <Route exact path="/">
                <Dashboard/>
                  </Route>
                  <Route exact path="/UserSignIn">
                    <UserSignIn/>
                  </Route>
                  <Route exact path="/UserLogin">
                    <UserLogin/>
                  </Route>
            
                </Switch>
              </div>            
            </Router>
            </div>
          );
    }
}

export default App;
