import { createAction } from 'redux-actions';
import { push } from 'react-router-redux'

// 新建store
const ADD_GUN = '加'
const ADD_DEL = '减'
const LOGIN = '登录'



export const addGum = createAction(ADD_GUN);

export function addDel() {
  return { type: ADD_DEL }
}

// 异步函数增加
export function addGumAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: ADD_GUN })
    }, 2000)
  }
}

// 异步函数减少
export function addDelAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: ADD_DEL })
    }, 2000)
  }
}

