'use client';
import React, {memo} from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";

const Expense =({expense, onDelete, onEdit, onExpenseClick}) => {
    return (
        <tr onClick={onExpenseClick}>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>{expense.date}</td>
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

export default memo(Expense);