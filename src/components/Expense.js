import { FaRegTrashCan } from "react-icons/fa6";
export default function Expense({id,title,amount,category,date,description,onDelete,onExpenseClick}){
    return (
        <tr onClick={() => onExpenseClick({id, title, amount, category, date, description})}>
            <td>{title}</td>
            <td>{amount}</td>
            <td>{category}</td>
            <td>{date}</td>
            <td>
                <FaRegTrashCan className="trash-icon" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                }}/>
            </td>
            <style jsx>{`
                .trash-icon:hover {
                    cursor: pointer;
                    color: #666;
                }
            `}</style>
        </tr>

    );
}