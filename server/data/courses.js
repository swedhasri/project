const courses = [
  {
    title: 'Complete Web Development Bootcamp',
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
    instructor: 'Dr. Angela Yu',
    category: 'Web Development',
    level: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 50,
    rating: 4.8,
    numReviews: 120,
    price: 49,
    syllabus: [
        { title: 'Introduction to HTML', duration: '1:00' },
        { title: 'CSS Styling', duration: '2:30' },
        { title: 'Javascript Basics', duration: '4:00' },
        { title: 'React Framework', duration: '6:00' },
        { title: 'Node.js Backend', duration: '5:00' }
    ]
  },
  {
    title: 'Python for Data Science and Machine Learning',
    description: 'Learn how to use NumPy, Pandas, Seaborn , Matplotlib , Plotly , Scikit-Learn , Machine Learning, Tensorflow , and more!',
    instructor: 'Jose Portilla',
    category: 'Data Science',
    level: 'Intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 40,
    rating: 4.7,
    numReviews: 85,
    price: 59,
    syllabus: [
        { title: 'Python Crash Course', duration: '2:00' },
        { title: 'NumPy & Pandas', duration: '3:30' },
        { title: 'Data Visualization', duration: '4:00' },
        { title: 'Machine Learning Basics', duration: '5:00' }
    ]
  },
  {
    title: 'The Complete Cyber Security Course',
    description: 'Volume 1 : Hackers Exposed. Explains the security weaknesses in systems and how to fix them.',
    instructor: 'Nathan House',
    category: 'Cyber Security',
    level: 'Advanced',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 35,
    rating: 4.9,
    numReviews: 200,
    price: 39,
    syllabus: [
        { title: 'Intro to Cyber Security', duration: '1:30' },
        { title: 'Network Security', duration: '4:00' },
        { title: 'Malware Threats', duration: '3:00' },
        { title: 'Anonymous Browsing', duration: '2:00' }
    ]
  },
  {
    title: 'Mastering Soft Skills for Success',
    description: 'Learn communication, leadership, and emotional intelligence skills to boost your career.',
    instructor: 'Simon Sinek',
    category: 'Soft Skills',
    level: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 12,
    rating: 4.6,
    numReviews: 50,
    price: 29,
    syllabus: [
        { title: 'Effective Communication', duration: '2:00' },
        { title: 'Leadership Principles', duration: '2:30' },
        { title: 'Time Management', duration: '1:30' }
    ]
  },
  {
      title: 'AI & Machine Learning A-Z',
      description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
      instructor: 'Kirill Eremenko',
      category: 'Artificial Intelligence',
      level: 'Intermediate',
      thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      duration: 45,
      rating: 4.5,
      numReviews: 300,
      price: 69,
      syllabus: [
          { title: 'Data Preprocessing', duration: '1:00' },
          { title: 'Regression', duration: '3:00' },
          { title: 'Classification', duration: '3:00' },
          { title: 'Clustering', duration: '2:00' }
      ]
  }
];

module.exports = courses;
