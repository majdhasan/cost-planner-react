import { AUTH_FAILED, AUTH_SUCCESS, AUTH_ATTEMPTING, USER_LOGGED_OUT } from './types'
import { apiLogin } from '../api/user'
const TOKEN_NAME = "cost_planner_token"

export const signIn = reqData => {
    return async dispatch => {
        dispatch({ type: AUTH_ATTEMPTING })
        try {
            const { data: { token } } = await apiLogin(reqData)
            dispatch(success(token))
        } catch (e) {
            const { response: { data } } = e
            dispatch(error(data.error))
        }
    }
}

export const onLoadingSignin = () => {
    return dispatch => {
        try {
            const token = localStorage.getItem(TOKEN_NAME)
            if (token === null || token === "undefined") {
                return dispatch(error('You need to login'))
            }
            dispatch(success(token))
        } catch (e) {
            console.log(e);
        }

    }
}

export const logUserOut = () => {
    localStorage.clear();
    return ({ type: USER_LOGGED_OUT })
}

const success = (token) => {
    localStorage.setItem(TOKEN_NAME, token)
    return { type: AUTH_SUCCESS }
}

const error = (error) => {
    return { type: AUTH_FAILED, payload: error }
}
