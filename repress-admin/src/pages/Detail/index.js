import BaseComponent from '../../components/BaseComponent'
import React from 'react'

class Detail extends BaseComponent {
    constructor(props,context) {
        super(props,context);
    }

    render() {
        return (
            <p>
                Detail,url参数{this.props.match.params.id}
            </p>
        )
    }

}

export default Detail