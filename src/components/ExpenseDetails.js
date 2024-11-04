import { IoClose } from "react-icons/io5";
export default function ExpenseDetails({ expense, onClose }) {
    if (!expense) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <IoClose className="close-icon" onClick={onClose}/>
                <h2>Szczegóły Wydatku</h2>
                <p><strong>Tytuł:</strong> {expense.title}</p>
                <p><strong>Kwota:</strong> {expense.amount} zł</p>
                <p><strong>Kategoria:</strong> {expense.category}</p>
                <p><strong>Data:</strong> {expense.date}</p>
                <p><strong>Opis:</strong> {expense.description}</p>
            </div>
            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .modal-content {
                    position: relative;
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    max-width: 500px;
                    width: 100%;
                }

                .close-icon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: transparent;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                }

                .close-icon:hover {
                    color: #666;
                }
            `}</style>
        </div>
    );
}
