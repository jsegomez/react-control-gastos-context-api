import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function ExpenseForm() {

    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

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
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Cantidad del gasto</label>
                <select
                    id="category"
                    name="category"
                    className="bg-slate-100 p-2 rounded-md"
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
                <DatePicker className="bg-slate-100 p-2 border-0" />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer text-white p-2 w-full uppercase font-bold rounded-lg"
                value="Registrar gasto"
            />


        </form>
    )
}
