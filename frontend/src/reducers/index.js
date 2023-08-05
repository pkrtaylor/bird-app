import { combineReducers } from "redux";
import authReducer from './auth'
import tweetsReducer from './tweets'
import profileReducer from './profile'
import relationsReducer from './relations'
import alertReducer from "./alert";


export default combineReducers({
    auth: authReducer,
    tweets: tweetsReducer,
    profile: profileReducer,
    relations: relationsReducer,
    alert: alertReducer
})


