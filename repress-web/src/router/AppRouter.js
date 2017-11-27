import BaseComponent from '../components/BaseComponent'
import React from 'react'
import {
    Redirect,
    Route,
    Switch,
    HashRouter as Router
} from 'react-router-dom'

import Home from '../pages/Home/index'
import List from '../pages/List/index'
import Detail from '../pages/Detail/index'
import NotFound from '../pages/NotFound/index'


class AppRouteMap extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/list" component={List}/>
                    <Route path='/detail/:id' component={Detail}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </Router>
        )
    }

}

export default AppRouteMap;
