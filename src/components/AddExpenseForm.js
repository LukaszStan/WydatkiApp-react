'use client';
import React from 'react';
import { useGlobalContext } from '../GlobalContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    title: Yup.string().min(3, "Tytuł musi mieć co najmniej 3 znaki").required("Tytuł jest wymagany"),
    amount: Yup.number().positive("Kwota musi być dodatnia").required("Kwota jest wymagana"),
    category: Yup.string().required("Kategoria jest wymagana"),
    date: Yup.date().required("Data jest wymagana"),
    description: Yup.string().max(200, "Opis może mieć maksymalnie 200 znaków"),
});

export default function AddExpenseForm() {
    const { state, dispatch } = useGlobalContext();
    const { categories } = state;

    const initialValues = {
        title: '',
        amount: '',
        category: '',
        date: '',
        description: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        const newExpense = {
            ...values,
            id: Date.now(),
        };
        dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ dirty, isValid }) => (
                <Form>
                    <div>
                        <label>Tytuł: </label>
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" component="div" className="error" />
                    </div>
                    <div>
                        <label>Kwota: </label>
                        <Field type="number" name="amount" />
                        <ErrorMessage name="amount" component="div" className="error" />
                    </div>
                    <div>
                        <label>Kategoria: </label>
                        <Field as="select" name="category">
                            <option value="">Wybierz kategorię</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="div" className="error"/>
                    </div>
                    <div>
                        <label>Data: </label>
                        <Field type="date" name="date" />
                        <ErrorMessage name="date" component="div" className="error" />
                    </div>
                    <div>
                        <label>Opis: </label>
                        <Field as="textarea" name="description" />
                        <ErrorMessage name="description" component="div" className="error" />
                    </div>
                    <button type="submit" disabled={!dirty || !isValid}>Dodaj wydatek</button>
                </Form>
            )}
        </Formik>
    );
}
