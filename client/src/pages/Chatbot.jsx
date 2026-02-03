import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageSquare, Send, Bot, User, Search, Clock, PlusCircle } from 'lucide-react';

const initialGreeting = {
  role: 'assistant',
  text: 'Hi! I am your study assistant. Ask me doubts about courses, topics, or study plans.',
  timestamp: Date.now(),
};

const knowledgeBase = [
  {
    keywords: ['python', 'pandas', 'numpy'],
    answer:
      'Python is widely used for data science. Start with NumPy for arrays, Pandas for data frames, and Matplotlib/Seaborn for visualization. Practice with small datasets and gradually move to projects. Explore courses under Courses.',
  },
  {
    keywords: ['machine learning', 'ml', 'model', 'classification', 'regression'],
    answer:
      'Machine Learning involves training models on data. Begin with supervised learning (linear regression, logistic regression, decision trees) and then try ensemble methods and SVMs. Evaluate with proper metrics and cross-validation.',
  },
  {
    keywords: ['html', 'web', 'tags'],
    answer:
      'HTML structures web pages using tags like div, h1-h6, p, a, img, ul/li, and form inputs. Learn semantic elements (header, nav, main, section, article, footer) and proper nesting. Combine with CSS for styling and JS for interactivity.',
  },
  {
    keywords: ['react', 'frontend', 'components', 'hooks'],
    answer:
      'React builds UIs using components and hooks. Learn useState and useEffect first, then routing and state management patterns. Practice by building small components and pages.',
  },
  {
    keywords: ['node', 'express', 'backend', 'api'],
    answer:
      'Node.js with Express is great for REST APIs. Structure routes, controllers, and middleware. Secure endpoints with auth and validate inputs. Test using Postman and integrate with the frontend via Axios.',
  },
  {
    keywords: ['mongodb', 'mongoose', 'database', 'schema'],
    answer:
      'MongoDB stores JSON-like documents. Define schemas and models with Mongoose, index frequently queried fields, and design relations via references or embedding depending on access patterns.',
  },
  {
    keywords: ['cyber', 'security', 'hacking'],
    answer:
      'Cyber Security basics include network concepts, encryption, and common vulnerabilities. Learn secure coding practices, threat modeling, and regular audits. Practice in safe environments.',
  },
  {
    keywords: ['tailwind', 'css', 'ui'],
    answer:
      'Tailwind is a utility-first CSS framework. Use standard classes for spacing, layout, and color. Keep components consistent and accessible, and extract repeated patterns into reusable pieces.',
  },
];

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const tokenize = (s) => (s.toLowerCase().match(/[a-z0-9]+/g) || []);
const findAnswer = (q) => {
  const normalized = q.toLowerCase();
  const words = new Set(tokenize(normalized));
  for (const item of knowledgeBase) {
    for (const key of item.keywords) {
      const k = key.toLowerCase();
      if (k.includes(' ')) {
        const re = new RegExp(`(^|\\W)${escapeRegExp(k)}($|\\W)`, 'i');
        if (re.test(normalized)) return item.answer;
      } else {
        if (words.has(k)) return item.answer;
      }
    }
  }
  return 'I could not find a specific answer. Try asking about Python, ML, React, Node, MongoDB, Cyber Security, or Tailwind. You can also browse Courses or talk to Mentors.';
};

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatbotMessages');
    return saved ? JSON.parse(saved) : [initialGreeting];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('chatbotHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (textOverride) => {
    const trimmed = (textOverride ?? input).trim();
    if (!trimmed || loading) return;
    const userMsg = { role: 'user', text: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    const nextHistory = [...history, { text: trimmed, timestamp: Date.now() }];
    setHistory(nextHistory);
    localStorage.setItem('chatbotHistory', JSON.stringify(nextHistory));
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const answer = findAnswer(trimmed);
      const assistantMsg = { role: 'assistant', text: answer, timestamp: Date.now() };
      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const newChat = () => {
    const initial = [initialGreeting];
    setMessages(initial);
    localStorage.setItem('chatbotMessages', JSON.stringify(initial));
  };
  const runFromHistory = (text) => {
    if (loading) return;
    sendMessage(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Chatbot</h1>
          <p className="text-gray-600">Instant help with study doubts and guidance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden lg:col-span-2">
            <div className="p-4 h-[60vh] overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={m.role === 'assistant' ? 'flex items-start gap-3' : 'flex items-start gap-3 justify-end'}
              >
                {m.role === 'assistant' && (
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-2">
                    <Bot className="text-indigo-600" size={20} />
                  </div>
                )}
                <div
                  className={
                    m.role === 'assistant'
                      ? 'max-w-[75%] bg-indigo-50 text-gray-900 px-4 py-3 rounded-2xl'
                      : 'max-w-[75%] bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl'
                  }
                >
                  <div className="text-sm">{m.text}</div>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(m.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                {m.role === 'user' && (
                  <div className="flex-shrink-0 rounded-full bg-gray-200 p-2">
                    <User className="text-gray-700" size={20} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MessageSquare size={16} />
                Thinking…
              </div>
            )}
            </div>

            <div className="border-t border-gray-200 p-4 flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={sendMessage}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                <Send size={18} />
                Send
              </button>
            </div>
          </div>

          <aside className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Search History</h2>
              <button
                onClick={newChat}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
              >
                <PlusCircle size={18} />
                New Chat
              </button>
            </div>
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto space-y-3">
              {[...history].slice(-50).reverse().map((h, i) => (
                <button
                  key={i}
                  onClick={() => runFromHistory(h.text)}
                  className="w-full flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="flex-shrink-0 rounded-full bg-gray-200 p-2">
                    <Search className="text-gray-700" size={16} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm text-gray-900">{h.text}</span>
                    <span className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(h.timestamp).toLocaleTimeString()}
                    </span>
                  </span>
                </button>
              ))}
              {history.length === 0 && (
                <div className="text-sm text-gray-500">No searches yet.</div>
              )}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chatbot;
