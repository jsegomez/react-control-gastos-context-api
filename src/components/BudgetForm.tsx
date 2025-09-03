import { useState, type ChangeEvent, type FormEvent } from "react";
import { useBudget } from "../hooks/useBudget";
import { sanitizeDecimalNumber } from "../helpers";

export default function BudgetForm() {
    const [budget, setBudget] = useState('');
    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const sanitizedBudget = sanitizeDecimalNumber(e.target.value);
        
        setBudget(sanitizedBudget.toString());
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
        dispatch({ type: 'DEFINE_BUDGET', payload: { budget: Number(budget) } });        
    }

    return (
        <form className="space-y-5" onSubmit={ handleSubmit }>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-blue-600 font-bold text-center">
                    Definir presupuesto
                </label>
            </div>

            <input
                type="number"
                className="w-full bg-white p-2 border border-gray-300"
                placeholder="Define tu presupuesto"
                id="budget"
                name="budget"
                value={budget}
                onChange={ handleChange }
            />

            <input
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-2 uppercase font-bold p-2 uppercase disabled:opacity-50"
                value="Definir presupuesto"
                disabled={ budget === '' || Number(budget) <= 0 }
            />

        </form>
    )
}
