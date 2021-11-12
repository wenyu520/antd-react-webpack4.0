import React, { Component } from 'react'
import { Input, Button, Layout, Spin, Form, Icon, message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import style from './index.less';
import { addGum, addGumAsync } from "@/redux/action";
import Particle from 'react-particles-js';
class Login extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    // axios.get('/api/galaxy/patent_search_index')
  }
  submitSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err, values)
      if (!err) {
        const { username, password } = values;
        if (username === 'admin' && password === 'admin') {
          message.success('登录成功');
          this.props.history.push('/')
        } else {
          message.warning('用户名【admin】,密码【damin】');
        }

      }
    })
  }
  particle() {
    return (
      <Particle
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        params={{
          particles: {
            number: {
              value: 120, //数量
              density: {
                enable: true,
                value_area: 2000, //区域散布密度大小
              },
            },
            color: {
              value: '#1890ff', //原子的颜色
            },
            line_linked: {
              //连接线
              enable: true, //  连接线
              color: '#FFF', //连接线颜色
              width: '0.5', //连接线的宽度
              opacity: 0.8, //连接线不透明度
              shadow: {
                enable: true, //  连接线
                color: '#044568', //连接线颜色
                blur: 15,
                opacity: 0.8, //连接线不透明度
              },
            },
            shape: {
              //原子
              type: 'circle', //原子的形状
              stroke: {
                width: 0, //原理的宽度
                color: '#000000', //原子颜色
              },
              polygon: {
                nb_sides: 5, //  原子的多边形边数
              },
            },
            opacity: {
              value: 1, //不透明度
              random: true, //随机不透明度
              anim: {
                enable: true, //渐变动画
                speed: 1, //渐变动画速度
                opacity_min: 1, //渐变动画不透明度
                sync: false,
              },
            },
            size: {
              value: 8, // 原子大小
              random: true, //  原子大小随机
              anim: {
                enable: false, //原子渐变
                speed: 180, //原子渐变速度
                size_min: 0.1,
                sync: false,
              },
            },
            move: {
              enable: true, //原子移动
              speed: 4, //原子移动速度 (越大越快，越小越慢)
              direction: 'none', //   原子移动方向
              random: true, //  移动随机方向
              straight: false, // 直接移动
              out_mode: 'out', // 是否移动出画布
              bounce: false, //是否跳动移动
              attract: {
                enable: false, //原子之间吸引
                rotateX: 600, //原子之间吸引X水平距离
                rotateY: 1200, //y垂直距离
              },
            },
          },
          interactivity: {
            detect_on: 'canvas', // 原子之间互动检测
            events: {
              onhover: {
                enable: true, //悬停
                mode: 'repulse', //悬停模式 (击退效果,"grab" 抓取临近的,"bubble"泡沫球效果)
              },
            },
            modes: {
              grab: {
                distance: 100, // 原子互动抓取距离
                line_linked: {
                  opacity: 1, //原子互动抓取距离连线不透明度
                },
              },
              bubble: {
                distance: 100, // 原子抓取泡沫效果之间的距离
                size: 80, // 原子抓取泡沫效果之间的大小
                duration: 2, //原子抓取泡沫效果之间的持续事件
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 150, //击退效果距离
                duration: 0.4, //击退效果持续事件
              },
              push: {
                particles_nb: 4, //粒子推出的数量
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          backgroundColor: '#000000',
        }}
      />
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { addGum, counter, addGumAsync } = this.props
    return (
      <Layout className={style.login}>
        <Layout.Content>
          {this.particle()}
          <div className={style.loginContent}>
            <Spin tip="登录中" spinning={!true}>
              <Form onSubmit={(e) => this.submitSearch(e)}>
                <div className={style.loginTilte}>xxx登录 {counter}</div>
                <Form.Item name="username" >
                  {
                    getFieldDecorator('username', {
                      initialValue: 'admin',
                      rules: [
                        { required: true, message: 'Please username!', type: 'string' },
                      ]
                    })(
                      <Input size="large"
                        className={style.input}
                        prefix={<Icon type="user" style={{ color: '#fff' }} />}
                        placeholder="用户名"
                      />
                    )
                  }

                </Form.Item>
                <Form.Item name="password">
                  {
                    getFieldDecorator('password', {
                      initialValue: 'admin',
                      rules: [
                        { required: true, message: 'Please password!', type: 'string' }
                      ]
                    })(
                      <Input size="large"
                        className={style.input}
                        prefix={<Icon type="lock" style={{ color: '#fff' }} />}
                        type="password"
                        placeholder="密码"
                      />
                    )
                  }
                </Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className={style.loginFormButton}
                >
                  登录
                </Button>
                {/* <Button
                  size="large"
                  type="primary"
                  className={style.loginFormButton}
                  onClick={addGum}
                >
                  +
                </Button>
                <Button
                  size="large"
                  type="primary"
                  onClick={addGumAsync}
                  className={style.loginFormButton}
                >
                  +=
                </Button> */}
              </Form>
            </Spin>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}
const mapStateToProps = ({ login }) => login
// 获得方法,方法是上面倒入的 //将action的所有方法绑定到props上
const mapDispatchToProps = { addGum, addGumAsync }
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Login))
