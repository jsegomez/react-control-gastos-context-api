import { useReducer, type Dispatch, type ReactNode, useEffect } from "react";
import { budgetReducer, initialState, type BudgetAction, type BudgetState } from "../reducers/budget-reducer";
import { BudgetContext } from "./BudgetContextType";

export type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetProvider = ({ children } : BudgetProviderProps ) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    useEffect(() => {
        localStorage.setItem('budget', state.budget.toString());
    }, [state]);

    return(
        <BudgetContext.Provider value={{ state, dispatch }}>
            { children }
        </BudgetContext.Provider>
    );
};

