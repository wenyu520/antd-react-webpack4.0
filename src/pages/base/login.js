import React, { Component } from 'react'
import {Input, Button } from 'antd'
import {connect} from 'react-redux'
import {addGum, addGumAsync} from "@/redux/action";
 class Login extends Component {
    constructor(props){
        super(props)
        console.log(props)
    }
    render(){

        return(
            <div>
                {this.props.loginNum}
                <Button onClick={this.props.addGum}>add</Button>
                <Button onClick={this.props.addGumAsync}>延迟增加</Button>
            </div>
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
