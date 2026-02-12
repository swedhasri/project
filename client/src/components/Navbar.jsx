import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut, LayoutDashboard, Gamepad2, Bell } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Temporary mock auth state - will replace with Context later
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    // Force light mode always
    const current = 'light';
    setTheme(current);
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('theme', current);
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
      // Poll every 30 seconds for new notifications
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const markAsRead = async (id) => {
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <nav className="bg-white dark:bg-gradient-to-b dark:from-navy dark:to-navyDeep shadow-md sticky w-full z-50 top-0 left-0 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-indigo-600 dark:text-cyanAccent" />
              <span className="font-bold text-2xl tracking-tighter text-gray-800 dark:text-gray-100">Edu<span className="text-indigo-600 dark:text-cyanAccent">Bridge</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">Home</Link>
            <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">Courses</Link>
            <Link to="/lets-play" className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">
              <Gamepad2 size={18} />
              Let's Play
            </Link>
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">My Profile</Link>
            <Link to="/chatbot" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">Kiru</Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">Contact</Link>
            {user ? (
              <div className="flex items-center gap-4 relative">
                {/* Notification Bell */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-indigo-600 transition"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100 font-semibold text-gray-700 flex justify-between items-center">
                      <span>Notifications</span>
                      <span className="text-xs text-gray-500">{unreadCount} new</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                      ) : (
                        notifications.map(notification => (
                          <div
                            key={notification._id}
                            className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${!notification.isRead ? 'bg-indigo-50/50' : ''}`}
                            onClick={() => markAsRead(notification._id)}
                          >
                            <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{notification.message}</p>
                            <span className="text-xs text-gray-400 mt-1 block">{new Date(notification.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Notification Bell */}
            {user && (
              <button
                onClick={() => setShowNotifications(!showNotifications)} // Simplified for mobile
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">Home</Link>
            <Link to="/courses" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">Courses</Link>
            <Link to="/lets-play" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Gamepad2 size={18} />
              Let's Play
            </Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">My Profile</Link>
            <Link to="/chatbot" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">Kiru</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">Contact</Link>

            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">Dashboard</Link>
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
