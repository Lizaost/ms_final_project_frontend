import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";

import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';

import {Home} from "./pages/home/Home";
import {ProjectInfo} from "./pages/project-info/ProjectInfo";
import {PostDetails} from "./pages/post-details/PostDetails";
import {UserPage} from "./pages/user-page/UserPage";
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";
import {CreatePost} from "./pages/create-post/CreatePost";
import {SetTestCookies} from "./components/testing/SetTestCookies";
import {GetTestCookies} from "./components/testing/GetTestCookies";
import {Logout} from "./pages/logout/Logout";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className={'content'}>
                    <Switch>
                        <Route path="/posts/:id" component={PostDetails}/>
                        <Route path="/user/:id" component={UserPage}/>
                        <Route exact path="/info" component={ProjectInfo}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/logout" component={Logout}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/create" component={CreatePost}/>
                        <Route exact path="/cookies-set" component={SetTestCookies}/>
                        <Route exact path="/cookies-get" component={GetTestCookies}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
