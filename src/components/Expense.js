import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
export default function Expense({title,amount,category,date,onDelete,onEdit,onExpenseClick}){
    return (
        <tr onClick={onExpenseClick}>
            <td>{title}</td>
            <td>{amount}</td>
            <td>{category}</td>
            <td>{date}</td>
            <td>
                <FaEdit className="icon" onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                }}/>
            </td>
            <td>
                <FaRegTrashCan className="icon" onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}/>
            </td>
            <style>{`
                .icon:hover {
                    cursor: pointer;
                    color: #666;
                }
            `}</style>
        </tr>
    );
}