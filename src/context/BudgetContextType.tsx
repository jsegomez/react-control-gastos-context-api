import { createContext } from "react";
import type { BudgetContextProps } from "./BudgetContext";

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);