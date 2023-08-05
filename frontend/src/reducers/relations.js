import {
    FOLLOW_FAIL,
    FOLLOW_SUCCESS,
    GET_MAIN_USER_RL_FAIL,
    GET_MAIN_USER_RL_SUCCESS,
    RELATION_LIST_FAIL,
    RELATION_LIST_SUCCESS,
    RELATION_STATUS_FAIL,
    RELATION_STATUS_SUCCESS,
    UN_FOLLOW_FAIL,
    UN_FOLLOW_SUCCESS
 
} from '../actions/types'



const initalState = {
    relations:[],
    relationStatus: null,
    relationsList: null,
    mainRelationsList: null
}



const relationsReducer = (state = initalState, action) => {

    const { type, payload } = action

    switch (type) {
        case FOLLOW_SUCCESS:
            return{
                ...state,
                relations: payload
            }
        case FOLLOW_FAIL:
            return{
                ...state,
            }
        case RELATION_STATUS_SUCCESS:
            return{
                ...state,
                relationStatus: payload.relationStatus
            }
        case RELATION_LIST_SUCCESS:
            return {
                ...state,
                relationsList: payload
            }
        case RELATION_LIST_FAIL:
            return{
                ...state,
                relationsList: null
            }
        case GET_MAIN_USER_RL_SUCCESS:
            return {
                ...state,
                mainRelationsList: payload
            }
        case GET_MAIN_USER_RL_FAIL:
            return{
                ...state,
                mainRelationsList: null
            }
        case RELATION_STATUS_FAIL:
            return{
                ...state,
                relationStatus: null
            }
        default:
            return state;
    }

}



export default relationsReducer