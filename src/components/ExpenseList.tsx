import { useMemo } from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';


import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";
import type { Expense } from "../types";

export default function ExpenseList() {
    const { state, dispatch } = useBudget();

    const isEmpty = useMemo(()=> state.expenses.length === 0, [state.expenses]);

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => console.info('swipe action triggered')}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = (expense: Expense) => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({ type: 'DELETE_EXPENSE', payload: { id: expense.id } })} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );
    
    return (
        <div>            
            { isEmpty ? (
                <p className="text-center text-2xl text-gray-600 mt-10">No hay gastos. Agrega uno</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-600">Lista de gastos</h2>
                    
                    <div className="flex flex-col gap-2 mt-10">
                        <SwipeableList                            
                            fullSwipe={false}                            
                        >
                            {
                                state.expenses.map((expense)=> {
                                    return (
                                        <SwipeableListItem
                                            key={expense.id}
                                            leadingActions={leadingActions()} 
                                            trailingActions={trailingActions(expense)}                                            
                                            maxSwipe={30}                                            
                                        >
                                            <ExpenseDetails expense={expense} />
                                        </SwipeableListItem>
                                    )
                                })
                            }
                        </SwipeableList>
                    </div>
                </>
            ) }
        </div>
    )
}
