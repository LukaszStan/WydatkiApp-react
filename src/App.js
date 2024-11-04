'use client';
import expensesData from './data/expenses-data.json';
import ExpenseList from "./components/ExpensesList.js";
import ExpenseDetails from "./components/ExpenseDetails";
import AddExpenseForm from "./components/AddExpenseForm";
import EditExpenseForm from "./components/EditExpenseForm";
import Filter from "./components/Filter";
import { useState, useEffect } from "react";

export default function App() {
    const [expenses, setExpenses] = useState(expensesData);
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedExpense, setSelectedExpense] = useState("");
    const [editingExpense, setEditingExpense] = useState("");

    const categories = ["Jedzenie", "Rachunki", "Rozrywka", "Transport"];

    const handleDelete = (id) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(updatedExpenses);
    };

    const handleAddExpense = (newExpense) =>{
      setExpenses([newExpense, ...expenses]);
    };

    const handleExpenseClick = (expense) => {
        setSelectedExpense(expense);
    };

    const handleCloseModal = () => {
        setSelectedExpense(null);
    };

    const handleEditClick = (expense) => {
        setEditingExpense(expense);
    }

    const handleSaveEditedExpense = (updatedExpense) => {
        const updatedExpenses = expenses.map(expense =>
            // eslint-disable-next-line eqeqeq
            expense.id === updatedExpense.id ? updatedExpense: expense
        );
        setExpenses(updatedExpenses);
        setEditingExpense(null);
    }

    const handleCancelEdit = () => {
        setEditingExpense(null);
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
            <h1>Aplikacja do śledzenia wydatków</h1>
            <AddExpenseForm onAddExpense={handleAddExpense} categories={categories}/>
            <Filter
                categories={categories}
                selectedCategory={selectedCategory}
                selectedDate={selectedDate}
                onCategoryChange={setSelectedCategory}
                onDateChange={setSelectedDate}
            />
            <ExpenseList
            expenses={filteredExpenses}
            onDelete={handleDelete}
            onExpenseClick={handleExpenseClick}
            onEditClick={handleEditClick}
            />
            {selectedExpense && (
                <ExpenseDetails expense={selectedExpense} onClose={handleCloseModal} />
            )}
            {editingExpense && (
                <EditExpenseForm
                    expense={editingExpense}
                    onSave={handleSaveEditedExpense}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}
