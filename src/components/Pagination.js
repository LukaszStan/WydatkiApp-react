import React from 'react';
import { useGlobalContext } from '../providers/GlobalContext';

export default function Pagination() {
    const { expenses, currentPage, itemsPerPage, setCurrentPage } = useGlobalContext();

    const totalPages = Math.ceil(expenses.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Poprzednia
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                        margin: '0 5px',
                        backgroundColor: currentPage === index + 1 ? '#ddd' : '#fff',
                    }}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Następna
            </button>
        </div>
    );
}