import { EXPENSE_SAVED, EXPENSE_RESET, EXPENSE_FETCHING, EXPENSE_FETCHING_FAILED, EXPENSE_FETCHED } from '../actions/types'
import { apiAddExpense, apiFetchExpenses } from '../api/expense'
import { addErrorMessage, clearErrors } from './error_actions'


export const saveExpense = expense => {
    return async dispatch => {
        try {
            dispatch(clearErrors())
            await apiAddExpense(expense)
            dispatch({ type: EXPENSE_SAVED });
        } catch (e) {
            dispatch(addErrorMessage(e))
        }
    }
}

export const resetExpenseState = () => {
    return dispatch => {
        dispatch({ type: EXPENSE_RESET });
    }

}
export const fetchExpenses = () => {
    return async dispatch => {
        try {
            dispatch({ type: EXPENSE_FETCHING })
            const { data: { results } } = await apiFetchExpenses();
            dispatch({ type: EXPENSE_FETCHED, payload: results })
        } catch (e) {
            dispatch({ type: EXPENSE_FETCHING_FAILED })
            dispatch(addErrorMessage(e))
        }
    }
}