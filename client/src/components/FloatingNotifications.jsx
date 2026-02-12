import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FloatingNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
    }, []);

    // Fetch Notifications for count
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

    if (!user) return null;

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => navigate('/notifications')}
                className="group relative bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-indigo-500/40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
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
