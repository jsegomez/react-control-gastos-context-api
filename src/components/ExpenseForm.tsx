import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import DatePicker from 'react-date-picker';

import { categories } from "../data/categories";
import { sanitizeDecimalNumber } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import ErrorMessage from './ErrorMessage';
import type { DraftExpense, Value } from "../types";

export default function ExpenseForm() {
    const { dispatch, state, avaliableBudget } = useBudget();
    const [error, setError] = useState<boolean>(false);
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: null,
        category: '',
        date: new Date(),
    });

    useEffect(() => {
        if(state.editingExpense) setExpense(state.editingExpense);
    }, [state.editingExpense]);

    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value });
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const target = event.target.id;
        const value = target == 'amount' ? sanitizeDecimalNumber(event.target.value) : event.target.value;        
        setExpense({ ...expense, [target]: value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isSomeFieldEmpty = Object.values(expense).some(value => value === '' || value === null || value === 0);        
        if(isSomeFieldEmpty) {            
            setError(true);
            return;
        }
        setError(false);

        if(state.editingExpense) editExpense();
        else createNewExpense();
    }

    const createNewExpense = () => {
        dispatch({ type: 'ADD_EXPENSE', payload: { expense } });
        dispatch({ type: 'HIDE_MODAL' });
    }

    const editExpense = () => {        
        dispatch({ type: 'UPDATE_EXPENSE', payload: { expense: { ...expense, id: state.editingExpense!.id } } });        
    }

    return (        
        <form className="space-y-5" onSubmit={ handleSubmit }>
            <legend className="uppercase text-center font-black text-2xl border-b-4 py-2 border-blue-500">{ state.editingExpense ? 'Actualizar gasto' : 'Nuevo gasto' }</legend>

            { error && <ErrorMessage>Todos los campos son obligatorios</ErrorMessage> }

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
                disabled={avaliableBudget > expense.amount!}
                value={ state.editingExpense ? 'Actualizar gasto' : 'Registrar gasto' }
            />

            <button                
                type="button"
                className="bg-red-600 cursor-pointer text-white p-2 w-full uppercase font-bold rounded-lg"
                onClick={() => dispatch({ type: 'HIDE_MODAL' })}
            >
                Cancelar
            </button>
        </form>
    )
}
