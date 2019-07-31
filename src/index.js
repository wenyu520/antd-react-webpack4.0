import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, Button } from 'antd';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css';
import './styles/reset.scss'
import configure from '@/middleware'
import Router from '@/routers'
let store = configure({})
ReactDOM.render(
    (<Provider store={store}>
        <Router/>
    </Provider>),
    document.getElementById('root')
);
