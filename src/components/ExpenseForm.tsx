import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import { sanitizeDecimalNumber } from "../helpers";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: null,
        category: '',
        date: new Date(),
    });

    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value });
    }

    useEffect(() => {
        console.log(expense);
    }, [expense]);

    const handleFormChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const target = event.target.id;
        const value = target == 'amount' ? sanitizeDecimalNumber(event.target.value) : event.target.value;        
        setExpense({ ...expense, [target]: value });
    }

    return (
        <form className="space-y-5">
            <legend className="uppercase text-center font-black text-2xl border-b-4 py-2 border-blue-500">Nuevo gasto</legend>

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre del gasto</label>
                <input
                    type="text"
                    id="expenseName"
                    name="expenseName"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Añade el nombre del gasto"                    
                    value={expense?.expenseName}
                    onChange={ handleFormChange }
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad del gasto</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Añade la cantidad del gasto"
                    onChange={ handleFormChange }
                    value={expense?.amount || ''}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Cantidad del gasto</label>
                <select
                    id="category"
                    name="category"
                    className="bg-slate-100 p-2 rounded-md"
                    value={expense?.category}
                    onChange={ handleFormChange }
                >
                    <option value="" key="0">-- Selecciona una categoría --</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Fecha del gasto</label>
                <DatePicker
                    className="bg-slate-100
                    p-2 border-0"
                    value={expense?.date}
                    onChange={ handleChangeDate }
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer text-white p-2 w-full uppercase font-bold rounded-lg"
                value="Registrar gasto"
            />


        </form>
    )
}
