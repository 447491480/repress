import BaseComponent from '../../components/BaseComponent'
import React from 'react'

import {Layout} from 'antd'

class Main extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <Layout>
                <Layout.Header>header</Layout.Header>
                <Layout>
                    <Layout.Sider>left sidebar</Layout.Sider>
                    <Layout.Content>main content</Layout.Content>
                    <Layout.Sider>right sidebar</Layout.Sider>
                </Layout>
                <Layout.Footer>footer</Layout.Footer>
            </Layout>
        );
    }
}

export default Main;