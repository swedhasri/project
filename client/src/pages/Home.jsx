import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, TrendingUp, PlayCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Empowering College Students with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Quality Education</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Master in-demand skills, get mentorship from industry experts, and track your career growth with AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link to="/courses" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition border border-white/30 flex items-center justify-center gap-2">
                  Explore Courses <BookOpen size={20} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students learning" 
                className="relative rounded-2xl shadow-2xl border-4 border-white/10 transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose EduBridge?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We provide a comprehensive learning ecosystem designed to bridge the gap between academic learning and industry requirements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8 text-blue-500" />}
              title="Smart Learning Tools"
              description="Interactive lessons, quizzes, and projects designed to keep you engaged and improve retention."
              color="bg-blue-50"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-purple-500" />}
              title="Expert Mentorship"
              description="Connect with industry professionals for guidance, doubt clearing, and career advice."
              color="bg-purple-50"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-green-500" />}
              title="Progress Tracking"
              description="Visualize your learning journey with detailed analytics and AI-based recommendations."
              color="bg-green-50"
            />
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
              <p className="mt-2 text-gray-600">Top rated courses by fellow students</p>
            </div>
            <Link to="/courses" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
              View all courses <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Demo Course Cards */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1498050108023-c5249f4df085' : item === 2 ? '1555066931-4365d14bab8c' : '1550751827-4bd374c3f58b'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`} 
                    alt="Course thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition">
                      <PlayCircle size={32} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {item === 1 ? 'Web Dev' : item === 2 ? 'Data Science' : 'Cyber Security'}
                    </span>
                    <div className="flex items-center text-yellow-500 text-sm">
                      <span>★</span><span>4.{item + 5}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item === 1 ? 'Full Stack Web Development' : item === 2 ? 'Data Science Masterclass' : 'Ethical Hacking Essentials'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Learn from scratch and become an expert in {item === 1 ? 'MERN stack' : item === 2 ? 'Python & ML' : 'Network Security'} with hands-on projects.
                  </p>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://randomuser.me/api/portraits/men/${item + 20}.jpg`} alt="Instructor" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Dr. Smith</span>
                    </div>
                    <span className="text-indigo-600 font-bold">{item === 1 ? '$49' : item === 2 ? '$59' : '$39'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <div className={`p-8 rounded-2xl ${color} bg-opacity-50 hover:bg-opacity-100 transition duration-300 border border-transparent hover:border-gray-200`}>
    <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default Home;
