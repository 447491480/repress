import BaseComponent from '../../components/BaseComponent'

import React from 'react'


class List extends BaseComponent {
    constructor(props,context) {
        super(props,context);
    }

    render() {
        const arr = [1,2,3,4,5,6];

        return (
            <ul>
                {
                    arr.map((item,i)=>{
                        return <li key={i} onClick={this.clickHandler.bind(this,item)}>js jump to {item}</li>
                    })
                }
            </ul>
        )
    }

    clickHandler(value) {
         this.props.history.push('/detail/'+value)
    }
}

export default List

