import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import axios from 'axios';

const FloatingNotifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
    }, []);

    // Fetch Notifications
    useEffect(() => {
        if (user && user.token) {
            const fetchNotifications = async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${user.token}` }
                    };
                    const { data } = await axios.get('/api/notifications', config);
                    setNotifications(data);
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            };

            fetchNotifications();
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const markAsRead = async (id) => {
        if (!user) return;
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            await axios.put(`/api/notifications/${id}/read`, {}, config);
            setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    if (!user) return null;

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Notification List Popover */}
            {isOpen && (
                <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden animate-fade-in-up">
                    <div className="p-4 border-b border-gray-100 bg-indigo-600 text-white flex justify-between items-center">
                        <span className="font-bold flex items-center gap-2">
                            🔔 Notifications
                        </span>
                        <button onClick={() => setIsOpen(false)} className="text-indigo-200 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto bg-gray-50">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification._id}
                                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${!notification.isRead ? 'bg-white hover:bg-indigo-50 border-l-4 border-l-indigo-500' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                    onClick={() => markAsRead(notification._id)}
                                >
                                    <p className={`text-sm mb-1 ${!notification.isRead ? 'font-semibold text-gray-800' : ''}`}>
                                        {notification.message}
                                    </p>
                                    <span className="text-xs opacity-70 block text-right">
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-indigo-500/40 transition-all hover:scale-110 active:scale-95"
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm border-2 border-white animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>
        </div>
    );
};

export default FloatingNotifications;
