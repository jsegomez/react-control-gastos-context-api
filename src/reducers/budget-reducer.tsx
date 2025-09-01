export type BudgetAction =
    { type: 'DEFINE_BUDGET', payload: { budget: number } } |
    { type: 'SHOW_MODAL' } |
    { type: 'HIDE_MODAL' } |
    { type: 'RESET_BUDGET' }


export type BudgetState = {
    budget: number
    modal: boolean
}

const initialBudget = (): BudgetState['budget'] => {
    const budget = localStorage.getItem('budget');
        
    if(budget && !isNaN(Number(budget))) return Number(budget);
    else  return 0;
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false
}

export const budgetReducer = (state: BudgetState, action: BudgetAction) => {
    switch (action.type) {
        case 'DEFINE_BUDGET':
            return {
                ...state,
                budget: action.payload.budget
            }
        case 'RESET_BUDGET':
            return {
                ...state,
                budget: 0
            }
        case 'SHOW_MODAL':
            return {
                ...state,
                modal: true
            }
        case 'HIDE_MODAL':
            return {
                ...state,
                modal: false
            }
        default:
            return state;
    }
}