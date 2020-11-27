import { AUTH_FAILED, AUTH_SUCCESS, AUTH_ATTEMPTING } from './types'
import axios from 'axios'

export const signIn = reqData => {
    return async dispatch => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/v1/auth", reqData)
            console.log(data);
        } catch (e) {
            console.log(e.response.data);
        }
    }
}