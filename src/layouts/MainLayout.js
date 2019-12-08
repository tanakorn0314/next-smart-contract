import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const MainLayout = props => {
    return (
        <Layout className="layout">
            <Header className='topbar'>
                <h3 className="logo" >Block Vote</h3>
            </Header>
            <Content className='content'>
                {props.children}
            </Content>
            <style jsx>{`
                :global(.topbar) {
                    background-color: var(--color-primary);
                }
                :global(.content) {
                    min-height: calc(100vh - 64px);
                }
                .logo {
                    color: var(--color-light);
                }
            `}</style>
            <style jsx global>{`
                :root {
                    --color-primary: #008181;
                    --color-secondary: #65b1b2;
                    --color-thirtery: #a2d8d9;
                    --color-border: #e2e7e4;
                    --color-light: #f7f9f8;
                }
            `}</style>
        </Layout>
    )
}

export default MainLayout;