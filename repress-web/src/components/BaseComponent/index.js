import React,{Component}from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class BaseComponent extends Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
}

export default BaseComponent