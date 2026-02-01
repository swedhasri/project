import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageSquare, Video, Calendar, Send, User } from 'lucide-react';

const Mentors = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Senior Data Scientist',
      company: 'Google',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      expertise: ['Machine Learning', 'Python', 'Career Guidance'],
      rating: 4.9,
    },
    {
      id: 2,
      name: 'James Rodriguez',
      role: 'Full Stack Developer',
      company: 'Netflix',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      expertise: ['React', 'Node.js', 'System Design'],
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Cyber Security Analyst',
      company: 'Microsoft',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      expertise: ['Network Security', 'Ethical Hacking'],
      rating: 5.0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Expert Mentorship</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Connect with industry leaders to clear doubts, review projects, and get career advice.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentors List */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-start gap-4 mb-4">
                  <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
                    <p className="text-indigo-600 text-sm font-medium">{mentor.role}</p>
                    <p className="text-gray-500 text-xs">{mentor.company}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.expertise.map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedMentor(mentor)}
                    className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} /> Chat
                  </button>
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                    <Calendar size={16} /> Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chat / Doubt Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[600px] sticky top-24">
              <div className="bg-indigo-600 p-4 text-white">
                <h3 className="font-bold flex items-center gap-2">
                  <MessageSquare size={20} />
                  {selectedMentor ? `Chat with ${selectedMentor.name.split(' ')[0]}` : 'Mentor Support'}
                </h3>
                <p className="text-indigo-200 text-xs mt-1">
                  {selectedMentor ? 'Online' : 'Select a mentor to start chatting'}
                </p>
              </div>

              <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
                {!selectedMentor ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                    <MessageSquare size={48} className="mb-2 opacity-20" />
                    <p>Select a mentor from the list to ask your doubts.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] text-sm text-gray-700">
                        Hello! How can I help you with your studies today?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-indigo-600 p-3 rounded-lg rounded-tr-none shadow-sm max-w-[80%] text-sm text-white">
                        Hi, I have a doubt regarding React Hooks.
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 bg-white border-t border-gray-100">
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="text" 
                    placeholder="Type your doubt..." 
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
                    disabled={!selectedMentor}
                  />
                  <button 
                    type="submit" 
                    className={`p-2 rounded-lg transition ${selectedMentor ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    disabled={!selectedMentor}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Mentors;
