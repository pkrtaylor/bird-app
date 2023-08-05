import { setAlert } from './alert';
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
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
} from './types'

export const load_user = () => async dispatch => {

    try {
        const res = await fetch('/api/account/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: LOAD_USER_FAIL

            })
            // console.log(1)
        }
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL
        })
        //console.log(2)
    }
}

export const check_auth_status = () => async dispatch => {


    try {
        const res = await fetch('/api/account/verify/',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });


        if (res.status === 200) {
            dispatch({
                type: AUTHENTICATED_SUCCESS
            })
            dispatch(load_user())
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL
            })

            console.log(1)
        }
    } catch (error) {
        dispatch({
            type: AUTHENTICATED_FAIL
        })

        console.log(2)
    }
}

export const request_refresh = () => async dispatch => {

    try {
        const res = await fetch('/api/account/refresh/',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });

        if (res.status === 200) {
            dispatch({
                type: REFRESH_SUCCESS
            })
            dispatch(check_auth_status());
        }
        else {
            dispatch({
                type: REFRESH_FAIL
            })
            console.log(1)
        }
    } catch (error) {
        dispatch({
            type: REFRESH_FAIL
        })
        console.log(2)
    }
}


export const register = (
    email,
    first_name,
    last_name,
    username,
    password,
    re_password
) => async dispatch => {

    const body = JSON.stringify({
        email,
        first_name,
        last_name,
        username,
        password,
        re_password
    })

    dispatch({
        type: SET_AUTH_LOADING
    })

    try {


        //this request will first hit our next js api , which will then make anothe request to our django api
        //this request coudve been made directly to the django api since it dosent handle the cookie and you dont need to be authenticated 
        const res = await fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        }
        )
        const data = await res.json()
        console.log(data)
        if (res.status === 201) {
            dispatch({
                type: REGISTER_SUCCESS
            })
        }
        else {
            dispatch(setAlert(data.error, 'danger'))
            dispatch({
                type: REGISTER_FAIL
            })
        }

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    })
};

export const reset_register_success = () => dispatch => {
    dispatch({
        type: RESET_REGISTER_SUCCESS
    })
}

export const login = (username, password) => async dispatch => {
    const body = JSON.stringify({
        username,
        password
    });
    console.log('login action')
    dispatch({
        type: SET_AUTH_LOADING
    })

    try {

        const res = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body

        });
        const data = await res.json()
        console.log(data)
        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS
            })

            dispatch(load_user());
        }
        else {
            dispatch(setAlert(data.error, 'danger'))
            dispatch({
                type: LOGIN_FAIL
            })

        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })

    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}



export const logout = () => async dispatch => {
    try {
        const res = await fetch('/api/account/logout',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            })

        if (res.status === 200) {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }
        else {
            dispatch({
                type: LOGOUT_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL
        })
    }
}



