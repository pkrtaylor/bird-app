import {

    OPEN_EDIT_MODAL,
    CLOSE_EDIT_MODAL,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    SET_PROFILE_LOADING,
    SEND_PROFILE_FAIL,
    REMOVE_PROFILE_LOADING,
    SEND_PROFILE_SUCCESS,
    GET_MAIN_USER_PROFILE_SUCCESS,
    GET_MAIN_USER_PROFILE_FAIL

} from './types'






export const edit_modal_on = () => dispatch => {
    dispatch({
        type: OPEN_EDIT_MODAL
    })
}

export const edit_modal_off = () => dispatch => {
    dispatch({
        type: CLOSE_EDIT_MODAL
    })
}



export const send_profile = (bgp, pfp, display_name, bio, location, birthdate, user_id, username) => async dispatch =>{

    const body = new FormData()
    body.append('display_name', display_name)
    body.append('bgp', bgp)
    body.append('pfp', pfp)
    body.append('bio', bio)
    body.append('location', location)
    body.append('birthdate', birthdate)
    body.append('user_id', user_id)

    dispatch({type: SET_PROFILE_LOADING})

    try {
        

        const res = await fetch(`/api/profile/sendProfile`, {
            method: 'POST',
            body: body

        })

        const data = await res.json()

        if (res.status === 200) {
            dispatch({
                type: SEND_PROFILE_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: SEND_PROFILE_FAIL
            })
        }


    } catch (error) {
        dispatch({
            type: SEND_PROFILE_FAIL
        })
    }
    dispatch(get_user_profile(username))
    dispatch({type: REMOVE_PROFILE_LOADING})

}


export const get_user_profile = (id, isMainUser) => async dispatch =>{
        
    const body = JSON.stringify({
        id

    })
    console.log("profile action" + id)

    dispatch({type: SET_PROFILE_LOADING})
    try {
        
        const res = await fetch(`/api/profile/getProfile`, { //http://192.168.:3000/api/profile/getProfile
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })

        const data = await res.json()
        console.log(1)

        if(isMainUser)
        {
            if (res.status === 200) {
                dispatch({
                    type: GET_MAIN_USER_PROFILE_SUCCESS,
                    payload: data.profile
                })
            }
            else {
                dispatch({
                    type: GET_MAIN_USER_PROFILE_FAIL
                })
            }
        }
        else{
            if (res.status === 200) {
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    payload: data.profile
                })
            }
            else {
                dispatch({
                    type: GET_PROFILE_FAIL
                })
            }
        }

    } catch (error) {
        console.log('profile file ' + 2)

        dispatch({
            type: GET_PROFILE_FAIL
        })

    }

    dispatch({type: REMOVE_PROFILE_LOADING})
}




