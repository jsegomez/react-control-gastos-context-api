import { useReducer, type Dispatch, type ReactNode, useEffect, useMemo } from "react";
import { budgetReducer, initialState, type BudgetAction, type BudgetState } from "../reducers/budget-reducer";
import { BudgetContext } from "./BudgetContextType";

export type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>,
    avaliableBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetProvider = ({ children } : BudgetProviderProps ) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);
    const avaliableBudget:number = useMemo(() => {
        const totalExpenses = state.expenses.reduce((acc, expense) =>  acc + expense.amount!, 0);
        return state.budget - totalExpenses
    }, [state.expenses, state.budget]);

    useEffect(() => {
        localStorage.setItem('budget', state.budget.toString());        
    }, [state]);

    return(
        <BudgetContext.Provider value={{ state, dispatch, avaliableBudget }}>
            { children }
        </BudgetContext.Provider>
    );
};

