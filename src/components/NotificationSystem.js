import React from 'react';
import { useGlobalContext } from '../providers/GlobalContext';

export default function NotificationSystem() {
    const { notifications, removeNotification } = useGlobalContext();

    return (
        <div className="notification-system">
            {notifications.map((notification, index) => (
                <div key={index} className="notification">
                    <p>{notification}</p>
                    <button onClick={() => removeNotification(index)}>Usuń</button>
                </div>
            ))}
        </div>
    );
}
