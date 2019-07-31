// 新建store
const ADD_GUN = '加'
const ADD_DEL = '减'

// 根据老的state和action 生成新的state
export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1
        case ADD_DEL:
            return state - 1
        default:
            return 10
    }
}

export function addGum() {
    return {type: ADD_GUN}
}

export function addDel() {
    return {type: ADD_DEL}
}

// 异步函数增加
export function addGumAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch({type: ADD_GUN})
        }, 2000)
    }
}
// 异步函数减少
export function addDelAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch({type: ADD_DEL})
        }, 2000)
    }
}
