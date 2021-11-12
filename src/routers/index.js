import React, { Component } from 'react'
import { HashRouter, Router } from 'react-router-dom'

import UserLayout from "@/layouts/UserLayout";
import BaseLayout from "@/layouts/BaseLayout";
import * as user from '@/pages/user' // 基础
import * as base from '@/pages/base' // 基础
import notfound from '@/pages/notfound/index'

import { createRoutes } from '@/utils/help';
const routes = [
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    children: [
      {
        path: '/sign/login',
        title: 'Login',
        component: user.login
      },
      {
        title: '未找到页面',
        component: notfound
      }
    ]
  },
  {
    path: '/',
    title: '首页',
    indexRoute: '/home',
    component: BaseLayout,
    children: [
      {
        path: '/home',
        title: 'Index',
        indexRoute: '/home/1',
        component: base.home,
        children: [
          {
            path: '/home/1',
            title: 'IndexHome',
            component: base.home1
          },
          {
            path: '*',
            title: '未找到页面',
            to: '/',
            component: notfound
          }
        ]
      },
      {
        path: '*',
        title: '未找到页面',
        component: notfound
      }
    ]
  }
]
{/* <Route path="/login" component={base.login} /> */ }
export default () => (
  <HashRouter>
    {createRoutes(routes)}
  </HashRouter>
)