const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String }, // Can be video URL or text
  duration: { type: String }, // e.g. "10:00"
  completed: { type: Boolean, default: false } // For user tracking reference in enrollment
});

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Programming', 'Web Development', 'Full Stack Development', 'Artificial Intelligence', 'Cyber Security', 'Data Science', 'Soft Skills', 'Career Preparation'],
    },
    level: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    instructor: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String, // Preview video
    },
    duration: {
      type: Number, // In hours
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    syllabus: [chapterSchema],
    price: {
      type: Number,
      default: 0, // 0 for free
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
