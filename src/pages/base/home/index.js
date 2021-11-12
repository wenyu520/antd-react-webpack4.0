import React, { Component, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Layout } from 'antd';
import { Switch } from 'react-router-dom'
const { Content } = Layout;
function Home(props) {
  let history = useHistory();
  useEffect(() => {
    console.log(history);
    console.log(props);
    // history.push('/sign')
  }, [history])

  return (
    <Layout>
      <Content>
        1,3,4
        <Switch>{props.routerList.children}</Switch>
      </Content>
    </Layout>
  )
}

export default Home;