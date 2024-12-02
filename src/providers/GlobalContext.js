'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import expensesData from '../data/expenses-data.json';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const categories = ["Jedzenie", "Rachunki", "Rozrywka", "Transport"];
export default function GlobalProvider({ children }) {
    const [expenses, setExpenses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setExpenses(expensesData);
    }, []);

    const addExpense = (expense) =>
        setExpenses([...expenses, expense]);

    const editExpense = (id, updatedExpense) =>
        setExpenses(
            expenses.map((expense) =>
                expense.id === id
                    ? { ...expense, ...updatedExpense, isEditing: false }
                    : expense
            )
        );

    const deleteExpense = (id) =>
        setExpenses(expenses.filter((expense) => expense.id !== id));

    const selectExpense = (expense) => setSelectedExpense(expense);

    const clearSelectedExpense = () => setSelectedExpense(null);

    const setCategory = (category) => setSelectedCategory(category);

    const setDate = (date) => setSelectedDate(date);

    const addNotification = (message) =>
        setNotifications([...notifications, message]);

    return (
        <GlobalContext.Provider
            value={{
                expenses,
                selectedCategory,
                selectedDate,
                selectedExpense,
                notifications,
                addExpense,
                editExpense,
                deleteExpense,
                selectExpense,
                clearSelectedExpense,
                setCategory,
                setDate,
                addNotification,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}