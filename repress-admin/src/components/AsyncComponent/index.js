import React, {Component} from 'react';
import BaseComponent from '../BaseComponent';

import {Spin} from 'antd';

const Loading = () =>(
    <Spin tip={"请稍候..."} size="large" className={"globalSpin"}/>
);

export default (loadComponent, placeholder = Loading()) => {
    class AsyncComponent extends BaseComponent {
        unmount = false;

        constructor() {
            super();

            this.state = {
                component: null
            }
        }

        componentWillUnmount() {
            this.unmount = true
        }

        async componentDidMount() {
            const {default: component} = await loadComponent();

            if(this.unmount) return;

            this.setState({
                component: component
            })
        }

        render() {
            const C = this.state.component;

            return (
                C ? <C {...this.props}></C> : placeholder
            )
        }
    }

    return AsyncComponent
}
