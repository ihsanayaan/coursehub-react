import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 p-6 shadow z-40 md:static md:translate-x-0"
      >
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">📚 CourseHub</h2>

        <nav className="space-y-2">
          <Link
            to="/"
            onClick={onClose}
            className={`block px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
              isActive('/') ? 'bg-zinc-200 dark:bg-zinc-800 font-semibold' : 'text-gray-700 dark:text-white'
            }`}
          >
            🏠 Home
          </Link>
          <Link
            to="/mylearning"
            onClick={onClose}
            className={`block px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
              isActive('/mylearning') ? 'bg-zinc-200 dark:bg-zinc-800 font-semibold' : 'text-gray-700 dark:text-white'
            }`}
          >
            👨‍🎓 My Learning
          </Link>
          <Link
  to="/certificates"
  onClick={onClose}
  className={`block px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
    isActive('/certificates') ? 'bg-zinc-200 dark:bg-zinc-800 font-semibold' : 'text-gray-700 dark:text-white'
  }`}
>
  🧾 Certificates
</Link>

        </nav>
      </motion.div>
    </>
  );
}
