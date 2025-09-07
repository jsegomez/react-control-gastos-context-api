import type { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterCategory() {
    const { dispatch } = useBudget();

    const setFilter = (event: ChangeEvent<HTMLSelectElement>) => {             
        const selectedFilter = event.target.value.length == 0 ? null : event.target.value;   

        dispatch({ type: "SET_FILTER", payload: { filter: selectedFilter } })
    }

    return (
        <div className="bg-white shadow-lg p-10 rounded-lg">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="filter">Filtrar gasto</label>
                    <select id="filter" className="bg-slate-100 p-3 flex-1 rounded-lg" onChange={ setFilter }>
                        <option value="">Todas las categorías</option>
                        {
                            categories.map( 
                                (category) => <option value={category.id} key={category.id}>{ category.name }</option>
                            )
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}
