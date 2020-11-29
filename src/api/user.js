import axios from 'axios';

export const apiLogin = (reqData) => {
    return axios.post("http://localhost:5000/api/v1/auth", reqData)
}

export const apiSignup = (reqData) => {
    return axios.post("http://localhost:5000/api/v1/register", reqData)
}

export const getProfile = () => {
    return axios.get("http://localhost:5000/api/v1/me")
}