import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";

import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';

import {Home} from "./pages/home/Home";
import {ProjectInfo} from "./pages/project-info/ProjectInfo";
import {PostDetails} from "./pages/post-details/PostDetails";
import {UserPage} from "./pages/user-page/UserPage";

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
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
