export default function Filter({ categories, selectedCategory, selectedDate, onCategoryChange, onDateChange }) {
    return (
        <div>
            <label>
                Kategoria:
                <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
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
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => onDateChange(e.target.value)}
                />
            </label>
        </div>
    );
}