import { EXPENSE_SAVED, EXPENSE_RESET } from '../actions/types'
import { apiAddExpense } from '../api/expense'


export const saveExpense = expense => {
    return async dispatch => {
        try {
            await apiAddExpense(expense)
            dispatch({ type: EXPENSE_SAVED });
        } catch (e) {
            console.log(e);
        }
    }
}

export const resetExpenseState = () => {
    return dispatch => {
        dispatch({ type: EXPENSE_RESET });
    }

}


