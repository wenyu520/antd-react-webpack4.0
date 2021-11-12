import React from "react";
import { Layout } from 'antd';
import { Switch } from 'react-router-dom'
const { Content } = Layout;
export default class UserLayout extends React.Component {
  render() {
    const { routerList } = this.props;
    const { children } = routerList;
    return (
      <Layout>
        <Content>
          <Switch>{children}</Switch>
        </Content>
      </Layout>
    )
  }
}