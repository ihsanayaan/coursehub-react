import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const storageKey = `course-${course.id}-data`;

  // Load enrollment data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setEnrolled(parsed.enrolled);
      setProgress(parsed.progress);
    }
  }, [storageKey]);

  const handleEnroll = () => {
    const randomProgress = Math.floor(Math.random() * 60) + 30; // 30–90%
    setEnrolled(true);
    setProgress(randomProgress);
    localStorage.setItem(storageKey, JSON.stringify({ enrolled: true, progress: randomProgress }));
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4 flex flex-col hover:scale-[1.02] transition">
      <Link to={`/course/${course.id}`}>
        <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-md" />
        <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{course.title}</h3>
        <p className="text-sm text-gray-600 dark:text-zinc-300 mb-2">{course.category}</p>
      </Link>

      {/* Progress bar */}
      {enrolled && (
        <div className="mt-3">
          <div className="w-full bg-zinc-300 dark:bg-zinc-600 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-green-700 dark:text-green-400">{progress}% Completed</p>
        </div>
      )}

      {/* Enroll Button */}
      <button
        onClick={handleEnroll}
        disabled={enrolled}
        className={`mt-auto px-4 py-2 rounded-md text-white text-sm transition ${
          enrolled ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {enrolled ? '✅ Enrolled' : 'Enroll Now'}
      </button>
    </div>
  );
}
