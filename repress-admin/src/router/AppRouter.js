import BaseComponent from '../components/BaseComponent'
import React from 'react'
import {
    Redirect,
    Route,
    Switch,
    HashRouter as Router
} from 'react-router-dom'


import Main from '../pages/Main'

import NotFound from '../pages/NotFound/index'


class AppRouteMap extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='*/' exact component={Main} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </Router>
        )
    }

}

export default AppRouteMap;
