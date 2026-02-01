const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const courses = require('./data/courses');
const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Enrollment.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    // Create users one by one to trigger pre-save hook for password hashing
    const createdUsers = [];
    for (const user of users) {
        const newUser = await User.create(user);
        createdUsers.push(newUser);
    }

    const adminUser = createdUsers[0]._id;

    const sampleCourses = courses.map((course) => {
      return { ...course, user: adminUser };
    });

    await Course.insertMany(sampleCourses);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Enrollment.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
