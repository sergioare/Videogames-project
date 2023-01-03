import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducer'
import thunk from 'redux-thunk'

//We need thunk Middleware to run something asyncronous
//CreateStore ( reducer, configurations)
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
