import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '@/redux/reducers'

const nextReducer = require('@/redux/reducers')
const nextAction = require('@/redux/action')

export default function configure(initialState) {
    // console.log('initialState', initialState)
    const create = window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore

    const createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
    )(create)

    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
