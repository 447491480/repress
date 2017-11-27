// 引入reducer
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import rootReducer from './rootReducer';

// 合并到主reducer
const reducer = combineReducers({
    root:rootReducer,
    routing: routerReducer
});

export default reducer;