import { AUTH_FAILED, AUTH_SUCCESS, AUTH_ATTEMPTING } from './types'
import { apiLogin } from '../api/user'

export const signIn = reqData => {
    return async dispatch => {
        dispatch({ type: AUTH_ATTEMPTING })
        try {
            const { data: { token } } = await apiLogin(reqData)
            dispatch(success(token))
        } catch (e) {
            const {response: {data }} = e
            dispatch(error(data.error))
        }
    }
}

const success = (token) => {
    localStorage.setItem("token", token)
    return { type: AUTH_SUCCESS }
}

const error = (error) => {
    return { type: AUTH_FAILED, payload: error }
}
