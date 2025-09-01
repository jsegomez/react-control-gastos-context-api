import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  const { dispatch } = useBudget();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="./grafico.jpg" alt="Grafica de gastos" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          onClick={() => dispatch({ type: 'RESET_BUDGET' })}
          className="bg-pink-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-pink-700 font-bold rounded-lg"
        >
            Resetear presupuesto
        </button>

        <AmountDisplay label="Presupuesto" amount={200} />
        <AmountDisplay label="Disponible" amount={200} />
        <AmountDisplay label="Gastado" amount={200} />
      </div>
    </div>
  )
}
