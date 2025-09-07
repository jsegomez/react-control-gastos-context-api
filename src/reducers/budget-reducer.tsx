import type { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';

export type BudgetAction =
    { type: 'DEFINE_BUDGET', payload: { budget: number } } |
    { type: 'SHOW_MODAL' } |
    { type: 'HIDE_MODAL' } |
    { type: 'ADD_EXPENSE', payload: { expense: DraftExpense } } |
    { type: 'DELETE_EXPENSE', payload: { id: string } } |   
    { type: 'EDIT_EXPENSE', payload: { expense: Expense } } |    
    { type: 'UPDATE_EXPENSE', payload: { expense: Expense } } |
    { type: 'SET_FILTER', payload: { filter: Expense['id'] | null } } | 
    { type: 'RESET_BUDGET' }
    
export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingExpense: Expense | null;
    filter: Expense['id'] | null
}

const initialBudget = (): BudgetState['budget'] => {
    const budget = localStorage.getItem('budget');
        
    if(budget && !isNaN(Number(budget))) return Number(budget);
    else  return 0;
}

const initialExpenses = (): Expense[] => {
    const savedData = localStorage.getItem('expenses');
    return savedData ? JSON.parse(savedData) : [];
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingExpense: null,
    filter: null
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
                budget: 0,
                expenses: []
            }
        case 'SHOW_MODAL':
            return {
                ...state,
                modal: true
            }
        case 'HIDE_MODAL':
            return {
                ...state,
                modal: false,
                editingExpense: null
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
        case 'EDIT_EXPENSE':
            {           

                return {
                    ...state,
                    editingExpense: action.payload.expense,
                    modal: true
                }
            }
        case 'UPDATE_EXPENSE':
            {                
                return {
                    ...state,
                    modal: false,
                    expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),                    
                }
            }
        case 'SET_FILTER': {
            {
                return {
                    ...state,
                    filter: action.payload.filter
                }
            }
        }
        default:
            return state;
    }
}