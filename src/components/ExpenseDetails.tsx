import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"

type ExpenseDetailsProps = {
    expense: Expense
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const categoryInfo = useMemo(()=> categories.find(category => category.id === expense.category), [expense.category]);  
  
  return (
    <div className="bg-white shadow-lg p-5 w-full border-gray-200 border-b rounded-md flex gap-5 items-center select-none">
        <div>
          <img className="w-14" src={`/icono_${categoryInfo?.icon}.svg`} alt={categoryInfo?.name} />
        </div>
        <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{ categoryInfo?.icon }</p>
            <p className="text-xl font-bold text-gray-600">{ expense.expenseName }</p>
            <p className="text-gray-600">{ formatDate(expense.date?.toString() ?? '') }</p>
        </div>

        <AmountDisplay amount={expense.amount ?? 0} />
    </div>
  )
}
