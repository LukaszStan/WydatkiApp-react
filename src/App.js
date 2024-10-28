'use client';
import expensesData from './data/expenses-data.json';
import ExpenseList from "./components/ExpensesList.js";
import ExpenseDetails from "./components/ExpenseDetails";
import Filter from "./components/Filter";
import { useState, useEffect } from "react";

export default function App() {
    const [expenses, setExpenses] = useState(expensesData);
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedExpense, setSelectedExpense] = useState(null);

    const categories = ["Jedzenie", "Rachunki", "Rozrywka", "Transport"];

    const handleDelete = (id) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(updatedExpenses);
    };

    const handleExpenseClick = (expense) => {
        setSelectedExpense(expense);
    };

    const handleCloseModal = () => {
        setSelectedExpense(null);
    };

    useEffect(() => {
        let filtered = expenses;

        if (selectedCategory) {
            filtered = filtered.filter((expense) => expense.category === selectedCategory);
        }

        if (selectedDate) {
            filtered = filtered.filter((expense) => expense.date === selectedDate);
        }

        setFilteredExpenses(filtered);
    }, [selectedCategory, selectedDate, expenses]);

    return (
        <div className="App">
            <Filter
                categories={categories}
                selectedCategory={selectedCategory}
                selectedDate={selectedDate}
                onCategoryChange={setSelectedCategory}
                onDateChange={setSelectedDate}
            />
            <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} onExpenseClick={handleExpenseClick} />
            {selectedExpense && (
                <ExpenseDetails expense={selectedExpense} onClose={handleCloseModal} />
            )}
        </div>
    );
}
