import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, TrendingUp, Clock, PlayCircle, Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
                        <p className="text-gray-600 mt-1 flex items-center gap-2">
                            <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase">
                                {user.educationLevel || 'Professional'}
                            </span>
                            {user.cgpa && <span>GPA: {user.cgpa}</span>}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-6">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Courses</p>
                            <p className="text-2xl font-bold text-indigo-600">{enrollments.length}</p>
                        </div>
                        <div className="w-px bg-gray-200"></div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Skills</p>
                            <p className="text-2xl font-bold text-green-600">{user.skills?.length || 0}</p>
                        </div>
                        <div className="w-px bg-gray-200"></div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">XP</p>
                            <p className="text-2xl font-bold text-yellow-500">1,250</p>
                        </div>
                    </div>
                </div>

                {/* Technical Skills Row */}
                {user.skills && user.skills.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        {user.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-gray-100 text-gray-600 text-xs font-bold rounded-lg shadow-sm">
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

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg text-gray-900">Next Reminder</h3>
                            <Clock className="text-orange-500" />
                        </div>
                        <p className="text-xl font-bold text-gray-800 mb-1">Web Dev Live Class</p>
                        <p className="text-gray-500 text-sm mb-4">Today, 5:00 PM</p>
                        <button className="w-full py-2 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition">
                            Join Session
                        </button>
                    </div>

                    {/* Achievements card removed per request */}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
                {loading ? (
                    <div className="flex justify-center p-12">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrollments.map((enrollment) => (
                            <div key={enrollment._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
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
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{enrollment.course.title}</h3>
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
