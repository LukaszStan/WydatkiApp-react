'use client';
import React from 'react';
import { useGlobalContext } from '../providers/GlobalContext';

export default function Filter() {
    const { state, dispatch } = useGlobalContext();
    const { categories, selectedCategory, selectedDate } = state;

    return (
        <div>
            <label>
                Kategoria:
                <select
                    value={selectedCategory}
                    onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
                >
                    <option value="">Wszystkie</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </label>
            <label>
                Data:
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })}
                />
            </label>
        </div>
    );
}
