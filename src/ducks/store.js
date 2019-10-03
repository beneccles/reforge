import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'
import listReducer from './listReducer'

const rootReducer = combineReducers({
    reducer, listReducer
})

const enhancer = compose(
    applyMiddleware(promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default createStore(rootReducer, enhancer)

