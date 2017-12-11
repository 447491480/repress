import BaseComponent from '../components/BaseComponent'
import React from 'react'
import {
    Route,
    Switch,
    HashRouter as Router
} from 'react-router-dom'

import routes from './router';

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        <route.component {...props} routes={route.routes}/>
    )}/>
);

class AppRouteMap extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route}/>
                    ))}
                </Switch>
            </Router>
        )
    }
}

export default AppRouteMap;
