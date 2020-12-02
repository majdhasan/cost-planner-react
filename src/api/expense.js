import axios from 'axios';

export const apiAddExpense = (reqData) => {
    return axios.post("http://localhost:5000/api/v1/expense", reqData)
}
export const apiFetchExpenses = () => {
    return axios.get("http://localhost:5000/api/v1/expense")
}