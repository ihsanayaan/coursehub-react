import React from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses';

export default function Certificates() {
  const earnedCertificates = courses.filter(course =>
    localStorage.getItem(`certificate_${course.id}`) === 'true'
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🎖 My Certificates</h1>

      {earnedCertificates.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">You haven't earned any certificates yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {earnedCertificates.map((course) => (
            <div key={course.id} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{course.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">📂 {course.category}</p>
              <p className="text-green-600 dark:text-green-400">🎉 Certificate Earned</p>
              <Link
                to={`/course/${course.id}`}
                className="text-blue-600 dark:text-blue-400 underline text-sm"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
