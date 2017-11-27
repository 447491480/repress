/*
 *  创建一个构造store的函数，真正的store在入口文件中创造
 */

import {compose, createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
// 引入thunk 中间件，处理异步操作
import promise from 'redux-promise';
import createHistory from 'history/createHashHistory';

// 创建 route 的中间件
let history = createHistory();
const routeMiddleware = routerMiddleware(history);

const middleware = [routeMiddleware, promise];

// 辅助使用chrome浏览器进行redux调试
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify here name, actionsBlacklist, actionsCreators and other options
        }) : compose;

// 调用 applyMiddleware ，使用 middleware 来增强 createStore
const configureStore = composeEnhancers(
    applyMiddleware(...middleware)
)(createStore);

export default configureStore;