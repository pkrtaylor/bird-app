import {
    SEND_TWEET_FAIL,
    SEND_TWEET_SUCCESS,
    SET_TWEET_LOADING,
    REMOVE_TWEET_LOADING,
    GET_HOME_TL_SUCCESS,
    GET_HOME_TL_FAIL,
    GET_REPLIES_SUCCESS,
    GET_REPLIES_FAIL,
    OPEN_MODAL,
    CLOSE_MODAL,
    GET_TWEET_ID
} from '../actions/types'



const initalState = {

    tweetId: null,
    isModal: false,
    homeTL: [],
    userTL: [],
    replies: [],
    loading: false
}

const tweetsReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SEND_TWEET_SUCCESS:
            return {
                ...state,
                homeTL: payload
            }
        case SEND_TWEET_FAIL:
            return {
                ...state,
            }
        case GET_HOME_TL_SUCCESS:
            return {
                ...state,
                homeTL: payload
            }
        case GET_HOME_TL_FAIL:
            return {
                ...state,
            }
        case GET_REPLIES_SUCCESS:
            return {
                ...state,
                replies: payload
            }
        case GET_REPLIES_FAIL:
            return {
                ...state,
            }
        case OPEN_MODAL:
            return {
                ...state,
                isModal: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isModal: false
            }
        case GET_TWEET_ID:
            return {
                ...state,
                tweetId: payload
            }
        case SET_TWEET_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_TWEET_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}


export default tweetsReducer
