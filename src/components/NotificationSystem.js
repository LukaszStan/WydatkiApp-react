'use client';
import React, { useEffect } from 'react';
import { useGlobalContext } from '../providers/GlobalContext';

export default function NotificationSystem() {
    const { state, dispatch } = useGlobalContext();
    const { notifications } = state;

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATIONS' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notifications, dispatch]);

    return (
        <div className="notification-container">
            {notifications.map((notification, index) => (
                <div key={index} className="notification">
                    {notification}
                </div>
            ))}
            <style>{`
                .notification-container {
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    z-index: 1000;
                }
                .notification {
                    background-color: #333;
                    color: #fff;
                    padding: 10px;
                    margin-bottom: 5px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}