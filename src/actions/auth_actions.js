import { AUTH_FAILED, AUTH_SUCCESS, AUTH_ATTEMPTING } from './types'
import axios from 'axios'

export const signIn = reqData => {
    return async dispatch => {
        try {
            const { data : {token} } = await axios.post("/api/v1/auth", reqData)
            dispatch(success(token))
        } catch (e) {
            dispatch(error(e.response.data))
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
