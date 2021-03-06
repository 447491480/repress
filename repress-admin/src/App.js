import React from 'react';
import BaseComponent from './components/BaseComponent'

import {Provider} from 'react-redux';

// 引入原始的配置模块
import store from './redux/store/index';
import AppRouter from './router/AppRouter';


class App extends BaseComponent {
    constructor(props) {
        super(props);

        if (process.env.NODE_ENV === 'production') {
            global.console = {
                info: () => {
                },
                log: () => {
                },
                warn: () => {
                },
                debug: () => {
                },
                error: () => {
                },
            };
        }
    }

    store = store;

    render() {
        return (
            <Provider store={this.store}>
                <AppRouter/>
            </Provider>
        );
    }
}

export default App;



