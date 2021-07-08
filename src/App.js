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
import CommunityForum from './Components/CommunityForum'
import CreateBlog from './Components/CreateBlog';
import BlogDetail from './Components/BlogDetail';
import Doctor from './Components/Doctor'
import Chat from './Components/Chat'
import ChatBot from './Components/ChatBot'
import Admin from './Components/Admin'
import AdminLogin from './AdminAuth/AdminLogin'
import AdminSignIn from './AdminAuth/AdminSignIn'


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
                <Route exact path = "/bot">
                  <ChatBot/>
                </Route>
                  <Route exact path="/UserSignIn">
                    <UserSignIn/>
                  </Route>
                  <Route exact path="/UserLogin">
                    <UserLogin/>
                  </Route>

                  <Route exact path="/AdminSignIn">
                    <AdminSignIn/>
                  </Route>
                  <Route exact path="/AdminLogin">
                    <AdminLogin/>
                  </Route>





                  {/* <Route exact path = "/chatBot">
                    <chatBot/>
                  </Route> */}
                  <Route exact path="/CommunityForum">
                    <CommunityForum />
                  </Route>
                  <Route path="/BlogDetail/:id">
                    <BlogDetail />
                  </Route>
                  <Route exact path="/CreateBlog">
                    <CreateBlog />
                  </Route>

                  <Route exact path="/admin">
                    <Admin/>
                  </Route>
                  <Route exact path="/doctor">
                    <Doctor/>
                  </Route>
                  <Route exact path="/FillForm">
                    <Chat/>
                  </Route>
                  <Route exact path="/chatbot">
                    <ChatBot/>
                  </Route>



                </Switch>
              </div>
             
            </Router>
        
        
                           
                               
            </div>
          );
    }
}

export default App;
