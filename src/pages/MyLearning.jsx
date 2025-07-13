import React, { useEffect, useState } from 'react';
import courses from '../data/courses';
import CourseCard from '../components/CourseCard';

export default function MyLearning() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const matched = courses.filter(c => stored.includes(c.id.toString()));
    setEnrolledCourses(matched);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📚 My Learning</h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-300">
          You haven't enrolled in any course yet. <br />
          Go to <strong>Home</strong> and enroll in a course to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {enrolledCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
