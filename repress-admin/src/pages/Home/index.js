import BaseComponent from '../../components/BaseComponent'
import React from 'react'

import {Layout,Button} from 'antd'

class Home extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <Layout>
                <Layout.Header>header</Layout.Header>
                <Layout>
                    <Layout.Sider>left sidebar</Layout.Sider>
                    <Layout.Content>
                        <Button type='primary'>Button</Button>
                    </Layout.Content>
                    <Layout.Sider>right sidebar</Layout.Sider>
                </Layout>
                <Layout.Footer>footer</Layout.Footer>
            </Layout>
        );
    }
}

export default Home;