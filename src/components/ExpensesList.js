import Expense from "./Expense";

export default function ExpenseList({expenses = [], onDelete, onExpenseClick}){
    if(!expenses.length) return <div>Brak wydatków</div>
    return (
        <table>
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
            {expenses.map((expense) => (
                <Expense key={expense.id} {...expense} onDelete={onDelete} onExpenseClick={onExpenseClick}/>
            ))}
            </tbody>
        </table>
    );
}