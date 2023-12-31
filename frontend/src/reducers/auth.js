import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_REGISTER_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
    OPEN_EDIT_MODAL,
    CLOSE_EDIT_MODAL
} from '../actions/types'

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    register_success: false,


};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                register_success: true
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        case RESET_REGISTER_SUCCESS:
            return {
                ...state,
                register_success: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
            return {
                ...state
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case REFRESH_SUCCESS:
            return {
                ...state,

            }
        case REFRESH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null

            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    };
};



export default authReducer