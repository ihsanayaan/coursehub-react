import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser || savedUser.email !== email) {
      setError('User not found. Please register first.');
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-zinc-800 p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">🔐 Login</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded border dark:bg-zinc-700 dark:text-white"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <p className="text-sm text-center mt-4 text-gray-600 dark:text-zinc-300">
        Don’t have an account? <a href="/register" className="text-blue-500 underline">Register</a>
      </p>
    </div>
  );
}
