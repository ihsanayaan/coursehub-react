import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter(course => {
    const matchesTitle = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || course.category === category;
    return matchesTitle && matchesCategory;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">📚 Explore Our Courses</h2>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border dark:bg-zinc-700 dark:text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded border dark:bg-zinc-700 dark:text-white"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <Link to={`/course/${course.id}`} key={course.id}>
              <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition hover:scale-[1.02]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{course.category}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">{course.description.slice(0, 80)}...</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-800 dark:text-white">🚫 No courses found.</p>
        )}
      </div>
    </div>
  );
}
