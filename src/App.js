'use client';
import { GlobalProvider } from './GlobalContext';
import ExpenseList from "./components/ExpensesList";
import ExpenseDetails from "./components/ExpenseDetails";
import AddExpenseForm from "./components/AddExpenseForm";
import Filter from "./components/Filter";
import NotificationSystem from "./components/NotificationSystem";

export default function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <h1>Aplikacja do śledzenia wydatków</h1>
                <NotificationSystem />
                <AddExpenseForm />
                <Filter />
                <ExpenseList />
                <ExpenseDetails />
            </div>
        </GlobalProvider>
    );
}