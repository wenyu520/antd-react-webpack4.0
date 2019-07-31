import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import * as login from './login'
// import * as common from './common'

const rootReducer = combineReducers({
    routing,
    config: (state = {}) => state,
    ...login,
    // ...common,
})

export default rootReducer
