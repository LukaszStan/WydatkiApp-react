import React from "react";
import {useGlobalContext} from "../providers/GlobalContext";

const Summary = () => {
    const { totalExpensesAmount, expenses } = useGlobalContext();

    return (
        <div className="summary">
            <h2>Podsumowanie wydatków</h2>
            <p>Liczba wydatków: {expenses.length}</p>
            <p>Łączna kwota: {totalExpensesAmount.toFixed(2)} zł</p>
        </div>
    );
};

export default Summary;
