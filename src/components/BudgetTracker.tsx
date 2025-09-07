import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {
  const { state, dispatch, avaliableBudget } = useBudget();
  const totalExpenses:number = useMemo(() => state.expenses.reduce( (acc, expense) =>  acc + expense.amount!, 0), [state.expenses]);
  const totalPercent: number = useMemo(() => {
    return Number(((totalExpenses / state.budget) * 100).toFixed(2));
  }, [state.budget, totalExpenses])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={totalPercent}              
          text={totalPercent.toString()}
          styles={buildStyles({
            pathColor: totalPercent >= 80 ? '#DC2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textSize: 12, 
            textColor: '#3b82f6'
          })}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          onClick={() => dispatch({ type: 'RESET_BUDGET' })}
          className="bg-pink-600 text-white px-4 py-2 cursor-pointer hover:bg-pink-700 font-bold rounded-lg"
        >
            Resetear presupuesto
        </button>

        <AmountDisplay label="Presupuesto" amount={ state.budget } />
        <AmountDisplay label="Disponible" amount={ avaliableBudget } />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  )
}
