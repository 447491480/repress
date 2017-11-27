import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.css';

let root = document.getElementById('root');

ReactDOM.render(<App />, root);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./App', () => {
        ReactDOM.render(<App />, root);
    });
}

registerServiceWorker();
