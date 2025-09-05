import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
    const { state } = useBudget();
    const isEmpty = useMemo(()=> state.expenses.length === 0, [state.expenses]);
    
    return (
        <div>            
            { isEmpty ? (
                <p className="text-center text-2xl text-gray-600 mt-10">No hay gastos. Agrega uno</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-600">Lista de gastos</h2>
                    <div className="flex flex-col gap-2 mt-10">
                        {
                            state.expenses.map((expense)=> {
                                return (
                                    <ExpenseDetails key={expense.id} expense={expense} />
                                )
                            })
                        }
                    </div>
                </>
            ) }
        </div>
    )
}
