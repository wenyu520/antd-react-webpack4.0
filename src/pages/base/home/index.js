import React, { Component } from 'react';
import axios from 'axios';
import { Layout } from 'antd';
class Home extends Component {
  constructor(props) {
    super(props)
    axios.get('/api/galaxy/patent_search_index')
  }
  render() {
    return (
      <div>123</div>
    )
  }
}
export default Home;