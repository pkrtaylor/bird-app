import {

    OPEN_EDIT_MODAL,
    CLOSE_EDIT_MODAL,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
    SET_PROFILE_LOADING,
    REMOVE_PROFILE_LOADING,
    GET_MAIN_USER_PROFILE_SUCCESS,
    GET_MAIN_USER_PROFILE_FAIL
} from '../actions/types'



const initalState = {
    editModal: false,
    profile: [],
    loading: false,
    mainProfile: []
}



const profileReducer = (state = initalState, action) => {

    const { type, payload } = action

    switch (type) {
        case GET_PROFILE_SUCCESS:
            return{
                ...state,
                profile: payload
            }
        case GET_PROFILE_FAIL:
            return{
                ...state
            }
        case GET_MAIN_USER_PROFILE_SUCCESS:
            return{
                ...state,
                mainProfile: payload
            }
        case GET_MAIN_USER_PROFILE_FAIL:
            return{
                ...state
            }
        case OPEN_EDIT_MODAL:
            return {
                ...state,
                editModal: true
            }
        case CLOSE_EDIT_MODAL:
            return {
                ...state,
                editModal: false
            }
        case SET_PROFILE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_PROFILE_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }

}



export default profileReducer