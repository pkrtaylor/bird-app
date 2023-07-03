import FormData from 'form-data';
import {
    CLOSE_MODAL,
    GET_HOME_TL_FAIL,
    GET_HOME_TL_SUCCESS,
    GET_REPLIES_FAIL,
    GET_REPLIES_SUCCESS,
    GET_TWEET_ID,
    OPEN_MODAL,
    REMOVE_TWEET_LOADING,
    SEND_TWEET_FAIL,
    SEND_TWEET_SUCCESS,
    SET_TWEET_LOADING
} from './types'



export const send_tweet = (
    text,
    media,
    user_id,
    isReply,
    parent
) => async dispatch => {

    // console.log(text)
    // console.log(user_id)
    // console.log(media)
    console.log('tweet file_1')

    // const body = JSON.stringify({
    //     user_id,
    //     text,
    //     media

    // })
    // const body = {
    //     "text" : text,
    //     "media" : media,
    //     "user_id": user_id

    // }



    // body['text'] = text
    // body['media'] = media
    // body['user_id'] = user_id

    //const body2 = JSON.stringify(body)

    // const body2 = JSON.parse(body)


    const body3 = new FormData();
    body3.append('text', text)
    body3.append('media', media)
    body3.append('user_id', user_id)
    body3.append('is_reply', isReply)
    body3.append('parent_id', parent)

    // console.log(body2)
    // console.log(body3)
    // console.log(1)
    // console.log(body2)


    dispatch({
        type: SET_TWEET_LOADING
    })

    try {


        const res = await fetch('/api/tweets/sendtweets', {
            method: 'POST',
            body: body3

        })

        const data = await res.json()

        if (res.status === 200) {
            dispatch({
                type: SEND_TWEET_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: SEND_TWEET_FAIL
            })
        }

    } catch (error) {
        dispatch({
            type: SEND_TWEET_FAIL
        })
    }

    dispatch({
        type: REMOVE_TWEET_LOADING
    })

}

export const load_homeTL = () => async dispatch => {

    try {
        const res = await fetch('/api/tweets/homeTimeLine', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: GET_HOME_TL_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: GET_HOME_TL_FAIL

            })
            console.log(1)
        }
    } catch (error) {
        dispatch({
            type: GET_HOME_TL_FAIL
        })
        console.log(2)
    }
}


export const get_replies = (parent_id) => async dispatch => {

    const body = JSON.stringify({
        parent_id

    })

    try {

        const res = await fetch('api/tweets/retrieveTweets', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })

        const data = await res.json()

        if (res.status === 200) {
            dispatch({
                type: GET_REPLIES_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: GET_REPLIES_FAIL
            })
        }

    } catch (error) {

        dispatch({
            type: GET_REPLIES_FAIL
        })

    }
}


export const modal_on = () => dispatch => {
    dispatch({
        type: OPEN_MODAL
    })
}

export const modal_off = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL
    })
}


export const get_tweet_id = (id) => dispatch => {

    dispatch({
        type: GET_TWEET_ID,
        payload: id
    })
}