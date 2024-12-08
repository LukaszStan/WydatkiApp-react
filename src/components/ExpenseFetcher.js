'use client';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../providers/GlobalContext';

export default function ExpenseFetcher() {
    const {
        setExpenses,
        addNotification
    } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/expenses/');
                if (!response.ok) throw new Error('Nie udało się pobrać danych');
                const data = await response.json();
                setExpenses(data);
            } catch (err) {
                setError(err.message);
                addNotification(`Błąd pobierania danych: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [setExpenses, addNotification]);

    if (loading) return <div>Ładowanie wydatków...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;
    return null;
}
