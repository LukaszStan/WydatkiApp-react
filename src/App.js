'use client';
import ExpenseList from "./components/ExpensesList";
import ExpenseFetcher from './components/ExpenseFetcher';
import GlobalProvider from "./providers/GlobalContext";
import AddExpenseForm from "./components/AddExpenseForm";
import Filter from "./components/Filter";
import NotificationSystem from "./components/NotificationSystem";

export default function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <h1>Aplikacja do śledzenia wydatków</h1>
                <ExpenseFetcher />
                <NotificationSystem />
                <AddExpenseForm />
                <Filter />
                <ExpenseList />
            </div>
        </GlobalProvider>
    );
}