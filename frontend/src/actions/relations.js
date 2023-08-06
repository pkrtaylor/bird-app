
import { API_URL, DJANGO_API_URL } from '../config'
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

} from './types'


export const relationsList = (username, isMainUser) => async dispatch =>{


    try {
        console.log("relations file 1")
        const res = await fetch(`${DJANGO_API_URL}/api/relations/relationsList/${username}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        })
        console.log("relations file 2")
        const data = await res.json()
        console.log(data)
        if(isMainUser){
            dispatch({
                type: GET_MAIN_USER_RL_SUCCESS,
                payload: data.relationsList
            })
        }
        else{
            dispatch({
                type: RELATION_LIST_SUCCESS,
                payload: data.relationsList
            })
        }
     


    } catch (error) {
        console.log("relations file 3")
        console.error(error)
        if(isMainUser)
        {
            dispatch({
                type: GET_MAIN_USER_RL_FAIL
            })
        }
        else{
            dispatch({
                type: RELATION_LIST_FAIL
            })
        }
    }
    

}


export const follow = (follower, followee) => async dispatch =>{

    
    const body = JSON.stringify({

        follower,
        followee

    })

    try {
        
        const res = await fetch(`${API_URL}/api/relations/follow`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
        })
        const data = await res.json()
        console.log(data)
        if (res.status === 201) {
            console.log("relations file 1")
            dispatch({
                type: FOLLOW_SUCCESS,
                payload: data
            })
            dispatch(relation_status(follower,followee))
            dispatch(relationsList(followee))
        }
        else {
            console.log("relations file 2")
            dispatch({
                type: FOLLOW_FAIL
            })
        }


    } catch (error) {
        console.log("relations file 3")
        dispatch({
            type: FOLLOW_FAIL
        })
    }
}
export const unfollow = (follower, followee) => async dispatch =>{

    
    const body = JSON.stringify({

        follower,
        followee

    })

    try {
        
        const res = await fetch(`${API_URL}/api/relations/unfollow`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
        })
        const data = await res.json()
        console.log(data)
        if (res.status === 200) {
            console.log("relations file 1")
            dispatch({
                type: UN_FOLLOW_SUCCESS
            })
            dispatch(relation_status(follower,followee))
            dispatch(relationsList(followee))
        }
        else {
            console.log("relations file 2")
            dispatch({
                type: UN_FOLLOW_FAIL
            })
        }


    } catch (error) {
        console.log("relations file 3")
        dispatch({
            type: UN_FOLLOW_FAIL
        })
    }
}

export const relation_status = (follower, followee) => async dispatch =>{

    console.log('relations file ' + follower)
  
    const body = JSON.stringify({

        follower,
        followee

    })

    try {
        
        const res = await fetch(`${API_URL}/api/relations/relationStatus`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
        })
        const data = await res.json()
        if (res.status === 201) {
            console.log("relations file 1")
            dispatch({
                type: RELATION_STATUS_SUCCESS,
                payload: data
            })
        }
        else {
            console.log("relations file 2")
            dispatch({
                type: RELATION_STATUS_FAIL
            })
        }


    } catch (error) {
        console.log("relations file 3")
        dispatch({
            type: RELATION_STATUS_FAIL
        })
    }
}