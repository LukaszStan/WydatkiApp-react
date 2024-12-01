'use client';
import React, { createContext, useContext, useReducer, useEffect } from "react";
import expensesData from './data/expenses-data.json';

const GlobalContext = createContext();

const initialState = {
    expenses: [],
    categories: ["Jedzenie", "Rachunki", "Rozrywka", "Transport"],
    selectedCategory: "",
    selectedDate: "",
    selectedExpense: null,
    notifications: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return { ...state, expenses: action.payload };
        case 'ADD_EXPENSE':
            return { ...state, expenses: [action.payload, ...state.expenses] };
        case 'DELETE_EXPENSE':
            return { ...state, expenses: state.expenses.filter(exp => exp.id !== action.payload) };
        case 'EDIT_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map(exp =>
                    exp.id === action.payload.id ? action.payload : exp
                ),
            };
        case 'SET_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        case 'SET_DATE':
            return { ...state, selectedDate: action.payload };
        case 'SET_SELECTED_EXPENSE':
            return { ...state, selectedExpense: action.payload };
        case 'CLEAR_SELECTED_EXPENSE':
            return { ...state, selectedExpense: null };
        case 'ADD_NOTIFICATION':
            return { ...state, notifications: [action.payload, ...state.notifications] };
        case 'CLEAR_NOTIFICATIONS':
            return { ...state, notifications: [] };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'SET_EXPENSES', payload: expensesData });
    }, []);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);