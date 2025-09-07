import { useEffect } from "react";
import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseList from "./components/ExpenseList";
import ExpenseModal from "./components/ExpenseModal";
import { useBudget } from "./hooks/useBudget";

function App() { 
  const { state } = useBudget();  

  useEffect(() => {    
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state.expenses])  

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        { state.budget && state.budget > 0 ?  <BudgetTracker /> : <BudgetForm /> }        
      </div>

      { state.budget && state.budget > 0 && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList />
          
          <ExpenseModal />
        </main>
      ) }
    </>
  )
}

export default App
