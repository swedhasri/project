import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { PlayCircle, Clock, BarChart, Star, CheckCircle, BookOpen, User, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        // Fallback for demo
        if (id === '1') {
            setCourse({
                _id: '1',
                title: 'Complete Web Development Bootcamp',
                description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
                instructor: 'Dr. Angela Yu',
                rating: 4.8,
                duration: 50,
                level: 'Beginner',
                thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                category: 'Web Development',
                price: 49,
                syllabus: [
                    { title: 'Introduction to HTML', duration: '1:00' },
                    { title: 'CSS Styling', duration: '2:30' },
                    { title: 'Javascript Basics', duration: '4:00' },
                    { title: 'React Framework', duration: '6:00' },
                    { title: 'Node.js Backend', duration: '5:00' }
                ]
            });
        }
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
        alert('Please login to enroll');
        return;
    }
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        await axios.post('http://localhost:5000/api/enrollments', { courseId: id }, config);
        alert('Enrolled successfully!');
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Course Header */}
      <div className="bg-gray-900 text-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 text-indigo-400 font-medium">
                        <span>{course.category}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                    </div>
                    <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
                    <p className="text-xl text-gray-300">{course.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={18} fill="currentColor" />
                            <span className="font-bold text-white">{course.rating}</span>
                            <span className="text-gray-400">({course.numReviews || 120} ratings)</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300">
                            <User size={18} />
                            <span>Created by <span className="text-white underline">{course.instructor}</span></span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300">
                            <Shield size={18} />
                            <span>Last updated {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
                {/* What you'll learn */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Master the core concepts', 'Build real-world projects', 'Get industry ready', 'Earn a certificate'].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Content */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {course.syllabus && course.syllabus.map((chapter, index) => (
                            <div key={index} className="border-b border-gray-100 last:border-0 p-4 hover:bg-gray-50 transition flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <PlayCircle className="text-gray-400" size={20} />
                                    <span className="text-gray-700 font-medium">{chapter.title}</span>
                                </div>
                                <span className="text-gray-500 text-sm">{chapter.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Floating Card) */}
            <div className="lg:col-span-1 relative">
                <div className="sticky top-24">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="relative h-48">
                            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <PlayCircle className="text-white opacity-80" size={64} />
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                            </div>
                            
                            <button 
                                onClick={handleEnroll}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                            >
                                Enroll Now
                            </button>
                            
                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="flex items-center gap-2"><Clock size={16}/> Duration</span>
                                    <span className="font-medium">{course.duration} hours</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="flex items-center gap-2"><BookOpen size={16}/> Lessons</span>
                                    <span className="font-medium">{course.syllabus ? course.syllabus.length : 0}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="flex items-center gap-2"><BarChart size={16}/> Level</span>
                                    <span className="font-medium">{course.level}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;
