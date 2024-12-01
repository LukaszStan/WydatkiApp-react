'use client';
import React, { useLayoutEffect, useRef, useEffect, useState  } from 'react';
import { useGlobalContext } from '../GlobalContext';
import Expense from "./Expense";
import ExpenseDetails from "./ExpenseDetails";
import EditExpenseForm from "./EditExpenseForm";

export default function ExpenseList() {
    const { state, dispatch } = useGlobalContext();
    const { expenses, selectedCategory, selectedDate, selectedExpense } = state;

    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        if (totalExpenses > 5000) {
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: 'Uwaga! Przekroczyłeś budżet 5000 zł!',
            });
        }

        const largeExpense = expenses.find(expense => parseFloat(expense.amount) > 1000);
        if (largeExpense) {
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: `Duży wydatek: ${largeExpense.title} za ${largeExpense.amount} zł.`,
            });
        }
    }, [expenses, dispatch]);

    useEffect(() => {
        const filterExpenses = () => {
            return expenses.filter(expense => {
                if (selectedCategory && expense.category !== selectedCategory) return false;
                return !(selectedDate && expense.date !== selectedDate);
            });
        };
        setFilteredExpenses(filterExpenses());
    }, [expenses, selectedCategory, selectedDate]);

    const handleExpenseClick = (expense) => {
        dispatch({ type: 'SET_SELECTED_EXPENSE', payload: expense });
    };

    const handleCloseModal = () => {
        dispatch({ type: 'CLEAR_SELECTED_EXPENSE' });
    };

    const tableRef = useRef(null);

    useLayoutEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollTop = tableRef.current.scrollHeight;
        }
    }, [expenses]);

    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

    const handleCancelEdit = () => {
        setEditingExpense(null);
    };

    if (editingExpense) {
        return <EditExpenseForm expense={editingExpense} onCancel={handleCancelEdit} />;
    }

    if (!filteredExpenses.length) return <div>Brak wydatków</div>;

    return (
        <div>
            <table ref={tableRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Kwota</th>
                    <th>Kategoria</th>
                    <th>Data</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                {filteredExpenses.map(expense => (
                    <Expense
                        key={expense.id}
                        {...expense}
                        onDelete={() => dispatch({ type: 'DELETE_EXPENSE', payload: expense.id })}
                        onEdit={() => handleEdit(expense)}
                        onExpenseClick={() => handleExpenseClick(expense)}
                    />
                ))}
                </tbody>
            </table>
            {selectedExpense && (
                <ExpenseDetails expense={selectedExpense} onClose={handleCloseModal} />
            )}
        </div>
    );
}
