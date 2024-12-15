'use client';
import ExpenseList from "./components/ExpensesList";
import ExpenseFetcher from './components/ExpenseFetcher';
import GlobalProvider from "./providers/GlobalContext";
import AddExpenseForm from "./components/AddExpenseForm";
import Filter from "./components/Filter";
import NotificationSystem from "./components/NotificationSystem";
import Summary from "./components/Summary";
import ErrorBoundary from "./components/ErrorBoundary";
import {Suspense} from "react";
import {ClipLoader} from "react-spinners";

export default function App() {
    return (
        <ErrorBoundary>
            <GlobalProvider>
                <div className="App">
                    <h1>Aplikacja do śledzenia wydatków</h1>
                    <NotificationSystem />
                    <AddExpenseForm />
                    <Filter />
                    <Suspense fallback={<ClipLoader size={50} color="#123abc" />}>
                        <ExpenseFetcher />
                        <ExpenseList />
                    </Suspense>
                    <Summary />
                </div>
            </GlobalProvider>
        </ErrorBoundary>
    );
}