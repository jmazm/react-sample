import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';


import Home from '@page/home'
import Template from '@page/Template';

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home}></Route>
            <Route path="/template" component={Template}></Route>
        </div>
    </Router>
)

export default App;