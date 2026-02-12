import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, TrendingUp, Clock, PlayCircle, Trophy, BarChart, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RBarChart, Bar } from 'recharts';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dailyHistory, setDailyHistory] = useState([]);

    // Logic for Daily History (Graph Data) - copied from About.jsx to ensure consistent experience
    useEffect(() => {
        const savedHistory = localStorage.getItem('progressHistory');
        if (savedHistory) {
            setDailyHistory(JSON.parse(savedHistory));
        } else {
            const days = 14;
            const today = new Date();
            const defaults = Array.from({ length: days }, (_, i) => {
                const d = new Date(today);
                d.setDate(today.getDate() - (days - 1 - i));
                const key = d.toISOString().split('T')[0];
                return { date: key, value: Math.floor(Math.random() * 40) + 10, active: Math.random() > 0.3 };
            });
            setDailyHistory(defaults);
            localStorage.setItem('progressHistory', JSON.stringify(defaults));
        }
    }, []);

    const history14 = dailyHistory.slice(-14);
    const progressSeries = history14.map(d => ({ name: d.date.slice(5), value: d.value }));
    const consistencySeries = history14.map(d => ({ name: d.date.slice(5), active: d.active ? 1 : 0 }));

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!user) return;
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/enrollments/myenrollments', config);
                if (!Array.isArray(data)) {
                    console.error('Expected array from /api/enrollments/myenrollments, got:', typeof data);
                    setEnrollments([]);
                } else {
                    setEnrollments(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
                // Dummy data for visual check if API empty or fail
                setEnrollments([
                    {
                        _id: 'e1',
                        course: {
                            _id: '1',
                            title: 'Complete Web Development Bootcamp',
                            thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            totalLessons: 50
                        },
                        progress: 35,
                        completedLessons: []
                    },
                    {
                        _id: 'e2',
                        course: {
                            _id: '2',
                            title: 'Python for Data Science',
                            thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            totalLessons: 40
                        },
                        progress: 10,
                        completedLessons: []
                    }
                ]);
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [user]);

    if (!user) return <div className="p-10">Please login</div>;

    return (
        <div className="min-h-screen bg-white flex flex-col text-black">
            <Navbar />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-black">Welcome back, {user.name.split(' ')[0]}!</h1>
                        <p className="text-black mt-1 flex items-center gap-2">
                            <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase">
                                {user.educationLevel || 'Professional'}
                            </span>
                            {user.cgpa && <span>GPA: {user.cgpa}</span>}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-6">
                        <div className="text-center">
                            <p className="text-xs text-black uppercase font-bold tracking-wide">Courses</p>
                            <p className="text-2xl font-bold text-indigo-600">{enrollments.length}</p>
                        </div>
                        <div className="w-px bg-gray-200"></div>
                        <div className="text-center">
                            <p className="text-xs text-black uppercase font-bold tracking-wide">Skills</p>
                            <p className="text-2xl font-bold text-green-600">{user.skills?.length || 0}</p>
                        </div>
                        <div className="w-px bg-gray-200"></div>
                        <div className="text-center">
                            <p className="text-xs text-black uppercase font-bold tracking-wide">XP</p>
                            <p className="text-2xl font-bold text-yellow-500">1,250</p>
                        </div>
                    </div>
                </div>

                {/* Technical Skills Row */}
                {user.skills && user.skills.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        {user.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-gray-200 text-black text-xs font-bold rounded-lg shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">Study Goal</h3>
                            <TrendingUp className="opacity-80" />
                        </div>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold">4.5</span>
                            <span className="text-indigo-200 mb-1">/ 6 hrs</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-2">
                            <div className="bg-white rounded-full h-2 w-[75%]"></div>
                        </div>
                        <p className="text-sm mt-3 text-indigo-100">Daily target almost reached!</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg text-black">Next Reminder</h3>
                            <Clock className="text-orange-500" />
                        </div>
                        <p className="text-xl font-bold text-black mb-1">Web Dev Live Class</p>
                        <p className="text-black text-sm mb-4">Today, 5:00 PM</p>
                        <button className="w-full py-2 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition">
                            Join Session
                        </button>
                    </div>

                    {/* Achievements Summary */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg text-black">Achievements</h3>
                            <Trophy className="text-yellow-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle size={18} />
                                <span className="text-sm font-medium">Completed first EDA report</span>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-600">
                                <CheckCircle size={18} />
                                <span className="text-sm font-medium">Reached 50% in DS/ML course</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Graphs Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-black mb-4">Daily Progress</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={progressSeries} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#000" />
                                    <YAxis domain={[0, 100]} stroke="#000" />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#000' }} />
                                    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-black mb-4">Consistency</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RBarChart data={consistencySeries} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#000" />
                                    <YAxis domain={[0, 1]} tickFormatter={(v) => (v ? 'On' : 'Off')} stroke="#000" />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#000' }} />
                                    <Bar dataKey="active" fill="#22c55e" />
                                </RBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-black mb-6">My Courses</h2>
                {loading ? (
                    <div className="flex justify-center p-12">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrollments.map((enrollment) => (
                            <div key={enrollment._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                                <div className="relative h-40">
                                    <img src={enrollment.course.thumbnailUrl} alt={enrollment.course.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                                            <div
                                                className="bg-green-400 rounded-full h-1.5 transition-all duration-1000"
                                                style={{ width: `${enrollment.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-white text-xs font-bold">{enrollment.progress}% Completed</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-black mb-2 line-clamp-1">{enrollment.course.title}</h3>
                                    <Link
                                        to={`/courses/${enrollment.course._id}/play`}
                                        className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition"
                                    >
                                        <PlayCircle size={18} />
                                        Continue Learning
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
