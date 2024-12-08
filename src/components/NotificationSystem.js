import React from 'react';
import { useGlobalContext } from '../providers/GlobalContext';

export default function NotificationSystem() {
    const { notifications, removeNotification } = useGlobalContext();

    return (
        <div>
            {notifications.length > 0 && (
                <div className="notifications">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="notification"
                            onClick={() => removeNotification(notification.id)}
                        >
                            {notification.message}
                        </div>
                    ))}
                </div>
            )}
            <style>{`
                    .notifications {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 300px;
                }
    
                    .notification {
                    background-color: #4caf50;
                    color: white;
                    padding: 10px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
    
                    .notification:hover {
                    background-color: #45a049;
                }
            `}
            </style>
        </div>
    );
}
