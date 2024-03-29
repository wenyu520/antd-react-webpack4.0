import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux'

// 根据老的state和action 生成新的state

const ADD_GUN = '加'
const ADD_DEL = '减'
const LOGIN = '登录'

/*export function counters(state = 0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1
        case ADD_DEL:
            return state - 1
        default:
            return 5
    }
}*/

let defaultState = {
  counter: 0
}
export const login = handleActions({
  [ADD_GUN]: (state, action) => ({ ...state, counter: state.counter + 1 }),
  [ADD_DEL]: (state, action) => ({ ...state, counter: state.counter - 1 }),
  [LOGIN]: (state, action) => {
    console.log(state, action)
    dispatch(push('/register'))
  },

}, defaultState)

