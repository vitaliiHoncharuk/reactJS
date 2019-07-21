import React from 'react';
import MyForm from './MyForm';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    console.log(localStorage.getItem('user'));
    return (
        <Router>
            <Switch>
                {localStorage.getItem('user')}
                ? <Route path='/' exact component={MyForm}/>
                : <Route path='/home' component={Home}/>
            </Switch>
        </Router>
    )
}

export default App;
