const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private
const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollmentExists = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (enrollmentExists) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      progress: 0,
      completedLessons: [],
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user enrollments
// @route   GET /api/enrollments/myenrollments
// @access  Private
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrollment details (check if enrolled)
// @route   GET /api/enrollments/:courseId
// @access  Private
const getEnrollmentByCourseId = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            user: req.user._id,
            course: req.params.courseId
        });
        if (enrollment) {
            res.json(enrollment);
        } else {
            res.status(404).json({message: 'Not enrolled'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// @desc    Update progress (complete a lesson)
// @route   PUT /api/enrollments/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
  const { lessonId } = req.body; // lessonId or chapterId

  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (enrollment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
      
      // Calculate progress percentage
      // We need total lessons count. Fetch course.
      const course = await Course.findById(enrollment.course);
      const totalLessons = course.syllabus.length;
      
      if (totalLessons > 0) {
        enrollment.progress = (enrollment.completedLessons.length / totalLessons) * 100;
      }
      
      if (enrollment.progress === 100) {
        enrollment.isCompleted = true;
        // Generate certificate logic here (placeholder)
        enrollment.certificateUrl = `certificate-${enrollment._id}.pdf`;
      }

      await enrollment.save();
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollCourse,
  getMyEnrollments,
  getEnrollmentByCourseId,
  updateProgress,
};
