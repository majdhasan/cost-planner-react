import { combineReducers } from 'redux'
import auth from './auth_reducer'
import signup from './signup_reducer'

export default combineReducers({
    auth,
    signup
})