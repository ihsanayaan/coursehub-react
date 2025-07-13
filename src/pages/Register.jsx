import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Auto-login redirect & dark mode setup
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/');
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [navigate]);

  const handleRegister = () => {
    setError('');

    if (!firstName || !lastName || !email.includes('@') || !email.includes('.')) {
      setError('⚠️ Please fill out all fields with valid info.');
      return;
    }

    const newUser = { firstName, lastName, email };
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');

    // Set default theme to light for new users
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 transition">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          📝 Register
        </h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded border dark:bg-zinc-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded border dark:bg-zinc-700 dark:text-white"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded border dark:bg-zinc-700 dark:text-white"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Register & Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-zinc-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
