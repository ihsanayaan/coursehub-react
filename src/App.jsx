import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import MyLearning from './pages/MyLearning';
import MyCertificates from './pages/MyCertificates';
import Quiz from './pages/Quiz';
import Certificates from './pages/Certificates';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
     {sidebarOpen && (
  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
)}

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-zinc-900">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/learning" element={<MyLearning />} />
              <Route path="/certificates" element={<MyCertificates />} />
              <Route path="/course/:id/quiz" element={<Quiz />} />
              <Route path="/certificates" element={<Certificates />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
