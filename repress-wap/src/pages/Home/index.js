import BaseComponent from '../../components/BaseComponent'

import { Link } from 'react-router-dom'
import React from 'react'

class Home extends BaseComponent {
    constructor(props,context) {
        super(props,context);
    }

    render() {
        return (
            <div>
                <p>Home</p>
                <Link to="/list">to list</Link>
            </div>
        )
    }
}

export default Home

