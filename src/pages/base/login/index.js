import React, { Component } from 'react'
import {Input, Button, Layout, Spin, Form, Checkbox } from 'antd'
import {connect} from 'react-redux'
import {addGum, addGumAsync} from "@/redux/action";
import axios from 'axios';
 class Login extends Component {
    constructor(props){
        super(props)
        console.log(props)
        axios.get('/api/galaxy/patent/inventor/time')
    }
    render(){
        return(
           <Layout>
               <Layout.Content>
                    <Spin tip="登录中" spinning={!true}>
                        <Form>
                            <div>
                                <b>Admin</b>
                                <span>Admin</span>
                            </div>
                            <Form.Item name="username">
                                <Input size="large"/>
                            </Form.Item>
                            <Form.Item name="password">
                                <Input size="large"/>
                            </Form.Item>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                登录
                            </Button>
                        </Form>    
                    </Spin>
               </Layout.Content>
           </Layout>
        )
    }
}

// 获得数据
const mapStateToProps = ({timer}) => {
    return {loginNum: timer.counter}
}
// 获得方法,方法是上面倒入的 //将action的所有方法绑定到props上
const mapDispatchToProps = {addGum, addGumAsync}
// connect 第一个是获得数据源，第二个是获得方法源
Login = connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login
