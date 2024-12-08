'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const categories = ["jedzenie", "rachunki", "rozrywka", "transport"];

export default function GlobalProvider({ children }) {
    const [expenses, setExpenses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const paginatedExpenses = expenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const addExpense = async (expense) => {
        try {
            const response = await fetch('http://localhost:5000/expenses/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense),
            });
            if (!response.ok) throw new Error('Nie udało się dodać wydatku');
            const newExpense = await response.json();
            setExpenses((prev) => [...prev, newExpense]);
            addNotification('Wydatek dodany pomyślnie');
        } catch (err) {
            addNotification(`Błąd dodawania wydatku: ${err.message}`);
        }
    };

    const editExpense = async (id, updatedExpense) => {
        try {
            const response = await fetch(`http://localhost:5000/expenses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedExpense),
            });
            if (!response.ok) throw new Error('Nie udało się edytować wydatku');
            const editedExpense = await response.json();
            setExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? editedExpense : expense))
            );
            addNotification('Wydatek zaktualizowany pomyślnie');
        } catch (err) {
            addNotification(`Błąd edycji wydatku: ${err.message}`);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/expenses/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Nie udało się usunąć wydatku');
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
            addNotification('Wydatek usunięty pomyślnie');
        } catch (err) {
            addNotification(`Błąd usuwania wydatku: ${err.message}`);
        }
    };

    const searchExpenses = async ({ category, minAmount, maxAmount, date }) => {
        try {
            const query = new URLSearchParams({ category, minAmount, maxAmount, date });
            const response = await fetch(`http://localhost:5000/expenses/search?${query}`);
            if (!response.ok) throw new Error('Nie udało się wyszukać wydatków');
            const results = await response.json();
            setExpenses(results);
            addNotification('Wyniki wyszukiwania załadowane pomyślnie');
        } catch (err) {
            addNotification(`Błąd wyszukiwania: ${err.message}`);
        }
    };

    const addNotification = (message) => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id: Date.now(), message },
        ]);
    };

    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (notifications.length > 0) {
                removeNotification(notifications[0].id);
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [notifications]);

    const selectExpense = (expense) => setSelectedExpense(expense);
    const clearSelectedExpense = () => setSelectedExpense(null);
    const setCategory = (category) => setSelectedCategory(category);
    const setDate = (date) => setSelectedDate(date);

    return (
        <GlobalContext.Provider
            value={{
                expenses,
                setExpenses,
                paginatedExpenses,
                selectedCategory,
                selectedDate,
                selectedExpense,
                notifications,
                currentPage,
                itemsPerPage,
                addExpense,
                editExpense,
                deleteExpense,
                searchExpenses,
                selectExpense,
                clearSelectedExpense,
                setCategory,
                setDate,
                addNotification,
                removeNotification,
                setCurrentPage,
                setItemsPerPage,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}