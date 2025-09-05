import type { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';

export type BudgetAction =
    { type: 'DEFINE_BUDGET', payload: { budget: number } } |
    { type: 'SHOW_MODAL' } |
    { type: 'HIDE_MODAL' } |
    { type: 'ADD_EXPENSE', payload: { expense: DraftExpense } } |
    { type: 'DELETE_EXPENSE', payload: { id: string } } |    
    { type: 'RESET_BUDGET' }
    
export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
}

const initialBudget = (): BudgetState['budget'] => {
    const budget = localStorage.getItem('budget');
        
    if(budget && !isNaN(Number(budget))) return Number(budget);
    else  return 0;
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: []    
}

const createExpense = (expense: DraftExpense) => {
    const id = uuidv4();
    return { ...expense, id };
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
        case 'ADD_EXPENSE':
            {
                const expense = createExpense(action.payload.expense);
                return {
                    ...state,
                    expenses: [...state.expenses, expense]
                }
            }
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
        default:
            return state;
    }
}