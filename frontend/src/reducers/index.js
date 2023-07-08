import { combineReducers } from "redux";
import authReducer from './auth'
import tweetsReducer from './tweets'


export default combineReducers({
    auth : authReducer,
    tweets: tweetsReducer
})


