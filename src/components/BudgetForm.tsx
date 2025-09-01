import { useState, type ChangeEvent, type FormEvent } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
    const [budget, setBudget] = useState('0');
    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let sanitizedBudget = e.target.value.replace(/[^0-9.]/g, '');          
        
        const parts = sanitizedBudget.split('.');
        if (parts.length > 2) {
            sanitizedBudget = parts[0] + '.' + parts.slice(1).join('');
        }
        
        if (sanitizedBudget === '' || sanitizedBudget === '.') sanitizedBudget = '0';
        if (sanitizedBudget.length > 1 && !sanitizedBudget.includes('.')) {
            sanitizedBudget = sanitizedBudget.replace(/^0+/, '') || '0';
        }
        
        setBudget(sanitizedBudget);
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
