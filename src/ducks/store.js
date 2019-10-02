import { createStore, combineReducers } from 'redux'
import reducer from './reducer'
import listReducer from './listReducer'

const rootReducer = combineReducers({
    reducer, listReducer
})

export default createStore(rootReducer)
