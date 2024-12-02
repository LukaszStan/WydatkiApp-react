'use client';
import React, { useState } from "react";
import { useGlobalContext } from "../providers/GlobalContext";

export default function EditExpenseForm({ expense, onCancel }){
    const { state, dispatch } = useGlobalContext();
    const { categories } = state;

    const [title, setTitle] = useState(expense.title);
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const [date, setDate] = useState(expense.date);
    const [description, setDescription] = useState(expense.description);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error;
        switch (name) {
            case 'title':
                if (value.length < 3) {
                    error = "Tytuł musi mieć co najmniej 3 znaki.";
                }
                break;
            case 'amount':
                if (value <= 0) {
                    error = "Kwota musi być dodatnia.";
                }
                break;
            case 'category':
                if (!value) {
                    error = "Kategoria jest wymagana.";
                }
                break;
            case 'date':
                if (!value) {
                    error = "Data jest wymagana.";
                }
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (name, value) => {
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'amount':
                setAmount(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'date':
                setDate(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
        validateField(name, value);
    };

    const submit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(errors).some(error => error);
        if (hasErrors) return;

        const updatedExpense = {
            ...expense,
            title,
            amount,
            category,
            date,
            description,
        };

        dispatch({ type: "EDIT_EXPENSE", payload: updatedExpense });
        onCancel();
    };

    return (
        <form onSubmit={submit}>
            <div>
                <label>Tytuł</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => handleChange('title', e.target.value)}
                />
                {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
            </div>
            <div>
                <label>Kwota</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleChange('amount', Number(e.target.value))}
                />
                {errors.amount && <div style={{ color: 'red' }}>{errors.amount}</div>}
            </div>
            <div>
                <label>Kategoria</label>
                <select
                    value={category}
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <option value="">Wybierz kategorię</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
            </div>
            <div>
                <label>Data</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => handleChange('date', e.target.value)}
                />
                {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
            </div>
            <div>
                <label>Opis</label>
                <textarea
                    value={description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </div>
            <button type="submit">Zapisz</button>
            <button type="button" onClick={onCancel}>Anuluj</button>
        </form>
    );
}