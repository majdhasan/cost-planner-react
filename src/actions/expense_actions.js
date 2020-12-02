import { EXPENSE_SAVED, EXPENSE_RESET } from '../actions/types'
import { apiAddExpense } from '../api/expense'
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