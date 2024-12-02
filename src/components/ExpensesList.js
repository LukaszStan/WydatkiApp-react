'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useGlobalContext } from '../providers/GlobalContext';
import Expense from './Expense';
import ExpenseDetails from './ExpenseDetails';
import EditExpenseForm from './EditExpenseForm';

export default function ExpensesList() {
    const { expenses, selectedCategory, selectedDate, selectedExpense, selectExpense, deleteExpense, clearSelectedExpense} = useGlobalContext();
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [editingExpense, setEditingExpense] = useState(null);
    const tableRef = useRef(null);

    useEffect(() => {
        const filterExpenses = () => {
            return expenses.filter((expense) => {
                if (selectedCategory && expense.category !== selectedCategory) return false;
                return !(selectedDate && expense.date !== selectedDate);
            });
        };
        setFilteredExpenses(filterExpenses());
    }, [expenses, selectedCategory, selectedDate]);

    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

    const handleCancelEdit = () => {
        setEditingExpense(null);
    };

    useLayoutEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollTop = tableRef.current.scrollHeight;
        }
    }, [expenses]);

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
                {filteredExpenses.map((expense) => (
                    <Expense
                        key={expense.id}
                        {...expense}
                        onDelete={() => deleteExpense(expense.id)}
                        onEdit={() => handleEdit(expense)}
                        onExpenseClick={() => selectExpense(expense)}
                    />
                ))}
                </tbody>
            </table>
            {selectedExpense && (
                <ExpenseDetails expense={selectedExpense} onClose={clearSelectedExpense}/>
            )}
        </div>
    );
}
