import BaseComponent from '../components/BaseComponent'
import React from 'react'
import {
    Redirect,
    Route,
    Switch,
    HashRouter as Router
} from 'react-router-dom'

import * as routeConfig from '../configs/routers';

import Main from '../pages/Main'
import Detail from '../pages/Detail'


class AppRouteMap extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={routeConfig.MainRoute} exact component={Main}/>
                    <Route path={routeConfig.DetailRoute} exact component={Detail}/>
                </Switch>
            </Router>
        )
    }

}

export default AppRouteMap;
