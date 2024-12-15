'use client';

import React from 'react';
import { createResource } from '../utils/createResource';
import { useGlobalContext } from '../providers/GlobalContext';

const fetchExpenses = () => {
    return fetch('http://localhost:5000/expenses/')
        .then((response) => {
            if (!response.ok) throw new Error('Nie udało się pobrać danych');
            return response.json();
        });
};

const expensesResource = createResource(fetchExpenses());

export default function ExpenseFetcher() {
    const { setExpenses } = useGlobalContext();

    const expenses = expensesResource.read();

    React.useEffect(() => {
        setExpenses(expenses);
    }, [expenses, setExpenses]);

    return null;
}
