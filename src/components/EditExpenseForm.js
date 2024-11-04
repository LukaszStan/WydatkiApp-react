import React, { useState } from "react";

export default function EditExpenseForm({ expense, onSave, onCancel }){
    const [title, setTitle] = useState(expense.title);
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const [date, setDate] = useState(expense.date);
    const [description, setDescription] = useState(expense.description);

    const submit = e =>{
        e.preventDefault()
        if (title.length < 3) return alert("Tytuł musi mieć co najmniej 3 znaki.");
        if (amount <= 0) return alert("Kwota musi być dodatnia.");
        if (!category) return alert("Kategoria jest wymagana.");
        if (!date) return alert("Data jest wymagana.");

        const updatedExpense = {
            ...expense,
            title,
            amount,
            category,
            date,
            description,
        };

        onSave(updatedExpense);
    };

    return (
        <form onSubmit={submit}>
            <div>
                <label>Tytuł</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Kwota</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
            </div>
            <div>
                <label>Kategoria</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Wybierz kategorię</option>
                    <option value="Jedzenie">Jedzenie</option>
                    <option value="Rachunki">Rachunki</option>
                    <option value="Rozrywka">Rozrywka</option>
                    <option value="Transport">Transport</option>
                </select>
            </div>
            <div>
                <label>Data</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div>
                <label>Opis</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button type="submit">Zapisz</button>
            <button type="button" onClick={onCancel}>Anuluj</button>
        </form>
    );
}