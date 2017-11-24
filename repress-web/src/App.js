import React from 'react';

import BaseComponent from './components/BaseComponent'

import {Button} from 'antd'

import './App.css';

class App extends BaseComponent {
    render() {
        return (
            <div className="App">


                <Button type="primary">Button</Button>
            </div>
        );
    }
}

export default App;
