import { EXPENSE_SAVED, EXPENSE_RESET } from '../actions/types'

const INITIAL_STATE = {
    saved: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPENSE_SAVED:
            return { ...state, saved: true };
        case EXPENSE_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
}