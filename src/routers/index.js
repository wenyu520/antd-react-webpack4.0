import React, {Component} from 'react'
import {BrowserRouter, HashRouter, Switch, Router, Route} from 'react-router-dom'

import * as base from '@/pages/base' // 基础

export default () => (
    <HashRouter>
        <div id='app'>
            <Switch>
                <Route path="/" component={base.login}/>
                <Route path="/register" component={base.notfound}/>
                {/*如果没有path就每个页面都用这个组件，但是用Switch包住就可以上面没匹配到到才走这个路由*/}
                {/*<Route component={Dashboard}/>*/}
            </Switch>
        </div>
    </HashRouter>
)
