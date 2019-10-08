import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'
import listReducer from './listReducer'

const rootReducer = combineReducers({
    reducer, listReducer
})

const enhancer = compose(
    applyMiddleware(promiseMiddleware)
)
export default createStore(rootReducer, enhancer)

