import BaseComponent from '../../components/BaseComponent'

import React from 'react'

class NotFound extends BaseComponent {
    constructor(props,context) {
        super(props,context);
    }

    render() {
        return (
            <p>404 Not Found</p>
        )
    }
}

export default NotFound