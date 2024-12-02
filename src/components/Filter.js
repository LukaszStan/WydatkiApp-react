import React from 'react';
import { useGlobalContext, categories } from '../providers/GlobalContext';

export default function Filter() {
    const { setCategory, setDate} = useGlobalContext();

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <div className="filter">
            <label>
                Kategoria:
                <select onChange={handleCategoryChange} defaultValue="">
                    <option value="">Wszystkie</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Data:
                <input type="date" onChange={handleDateChange} />
            </label>
        </div>
    );
}
