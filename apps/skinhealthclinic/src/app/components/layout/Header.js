import React, { Fragment } from 'react';
//This is AntDesignLayout
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import '../SkinHealth.css';
const { Header, Content, Footer } = Layout;
import { ArrowLeftOutlined } from '@ant-design/icons';

function HeaderLayout(props) {
  return (
    <Fragment>
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <ArrowLeftOutlined /> <span>Back to services</span>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Fragment>
  );
}

export default HeaderLayout;
