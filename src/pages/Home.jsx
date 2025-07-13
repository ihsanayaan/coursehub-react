import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import courses from '../data/courses';

export default function Home() {
  const topCourses = courses.slice(0, 6);
  const categories = [...new Set(courses.map((c) => c.category))].slice(0, 5);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledCourses(enrolled);
  }, []);

  return (
    <div className="p-6 sm:p-12">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white">
          👋 Welcome to <span className="text-blue-600">CourseHub</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Learn tech & design skills from expert-led courses.
        </p>
        <Link
          to="/courses"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg transition shadow"
        >
          🚀 Browse All Courses
        </Link>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat, index) => (
          <span
            key={index}
            className="bg-zinc-200 dark:bg-zinc-700 text-sm text-zinc-800 dark:text-white px-4 py-1 rounded-full"
          >
            #{cat}
          </span>
        ))}
      </div>

      {/* Continue Learning */}
      {enrolledCourses.length > 0 && (
        <div className="mb-10 max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            🎓 Continue Learning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses
              .filter((c) => enrolledCourses.includes(c.id.toString()))
              .map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/course/${course.id}`}
                    className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition hover:scale-[1.02] block"
                  >
                    <img src={course.image} alt={course.title} className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{course.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Category: {course.category}</p>
                      <p className="text-sm text-blue-500 mt-2">⏳ Progress: Coming Soon</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {/* Popular Courses */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          🔥 Popular Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/course/${course.id}`}
                className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition hover:scale-[1.02] block"
              >
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.category}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {course.description.slice(0, 80)}...
                  </p>
                  <div className="text-sm text-yellow-500 mt-1">⭐ 4.7 | 1,200 students</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          💬 What Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { name: 'Ali R.', text: 'This platform helped me master React easily!', emoji: '🔥' },
            { name: 'Ayesha K.', text: 'Loved the UI/UX course — very practical.', emoji: '💡' },
            { name: 'Hamza S.', text: 'The quizzes and certificates are awesome!', emoji: '🎓' },
          ].map((review, i) => (
            <div key={i} className="bg-white dark:bg-zinc-800 p-6 rounded shadow">
              <div className="text-3xl mb-2">{review.emoji}</div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{review.text}</p>
              <h4 className="text-sm font-semibold text-blue-600">{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
