import BaseComponent from '../BaseComponent'
import React from 'react'

class List extends BaseComponent {
    constructor(props,context) {
        super(props,context);
    }

    render() {
        let data = this.props.todos;

        return (
            <ul style={{marginTop:'10px',fontSize:'20px',lineHeight:'30px'}}>
                {
                    data.map((item,i) => {
                        return <li key={i} onClick={this.clickHandler.bind(this,item.id)}>{item.text}</li>
                    })
                }
            </ul>
        )
    }

    clickHandler(id) {
        this.props.deleteFn(id);
    }


}

export default List;