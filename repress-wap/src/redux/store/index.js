// 创建唯一 store 并输出
import configureStore from './configureStore';
import reducer from '../reducers';

// 给增强后的store传入reducer
const store = configureStore(reducer);

// store 支持 mhr
if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;