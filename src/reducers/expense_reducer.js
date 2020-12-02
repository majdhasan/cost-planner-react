import { EXPENSE_SAVED, EXPENSE_RESET, EXPENSE_FETCHED, EXPENSE_FETCHING_FAILED, EXPENSE_FETCHING } from '../actions/types'

const INITIAL_STATE = {
    saved: false,
    expenses: [],
    fetching: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPENSE_SAVED:
            return { ...state, saved: true };
        case EXPENSE_RESET:
            return { ...state, saved: false };
        case EXPENSE_FETCHED:
            return { ...state, fetching: false, expenses: action.payload };
        case EXPENSE_FETCHING_FAILED:
            return { ...state, fetching: false };
        case EXPENSE_FETCHING:
            return { ...state, fetching: true };
        default:
            return state;
    }
}