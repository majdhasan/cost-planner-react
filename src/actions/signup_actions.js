import { SIGNUP_FAILED, SIGNUP_SUCCESS, SIGNUP_ATTEMPTING } from './types'
import { apiSignup } from '../api/user'

export const signUp = reqData => {
    return async dispatch => {
        dispatch({ type: SIGNUP_ATTEMPTING })
        try {
            const { data: { token } } = await apiSignup(reqData)
            dispatch(success(token))
        } catch (e) {
            const { response: { data } } = e
            dispatch(error(data.error))
        }
    }
}

const success = (token) => {
    localStorage.setItem("token", token)
    return { type: SIGNUP_SUCCESS }
}

const error = (error) => {
    return { type: SIGNUP_FAILED, payload: error }
}
