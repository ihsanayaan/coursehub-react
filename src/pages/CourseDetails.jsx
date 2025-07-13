import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import courses from '../data/courses';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [certificateUnlocked, setCertificateUnlocked] = useState(false);

  const course = courses.find(c => c.id.toString() === id);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolled(enrolledCourses.includes(id));
  }, [id]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
    setComments(savedComments);
  }, [id]);

  const handleEnroll = () => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledCourses.includes(id)) {
      enrolledCourses.push(id);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setEnrolled(true);
      setShowSuccess(true);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      text: newComment,
      user: `${user?.firstName || 'Anonymous'} ${user?.lastName || ''}`,
      date: new Date().toLocaleString()
    };

    const updated = [...comments, commentObj];
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
    setComments(updated);
    setNewComment('');
  };

  const handleDeleteComment = (index) => {
    const updated = comments.filter((_, i) => i !== index);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
    setComments(updated);
  };

  const handleCompleteQuiz = () => {
    setCertificateUnlocked(true);
    localStorage.setItem(`certificate_${id}`, 'true');
  };

  if (!course) return <p className="text-red-500 p-4">❌ Course not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Enroll Success */}
      {showSuccess && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded">
          🎉 Enrolled in <strong>{course.title}</strong>!
        </div>
      )}

      {/* Course Info */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-60 object-cover rounded-lg mb-6"
      />
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{course.title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-2">📂 Category: {course.category}</p>
      <p className="text-gray-700 dark:text-gray-200 mb-4">{course.description}</p>

      {/* Actions */}
      {enrolled ? (
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            ✅ Already Enrolled
          </button>

          <Link
            to={`/course/${id}/quiz`}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-center"
            onClick={handleCompleteQuiz}
          >
            🧠 Start Quiz
          </Link>
        </div>
      ) : (
        <button
          onClick={handleEnroll}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Enroll Now
        </button>
      )}

      {/* Progress */}
      {enrolled && (
        <div className="mt-6 bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">📈 Your Progress</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Progress tracking coming soon.</p>
        </div>
      )}

      {/* Certificate Section */}
      {certificateUnlocked && (
        <div className="mt-4 bg-blue-50 dark:bg-zinc-800 p-4 rounded border border-blue-300 dark:border-zinc-600 text-blue-800 dark:text-white">
          🎖 You have completed the quiz! Certificate will be available in <Link to="/certificates" className="underline">My Certificates</Link>.
        </div>
      )}

      {/* Comments */}
      {enrolled && (
        <div className="mt-6 bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">💬 Comments</h2>

          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 mb-2 border rounded dark:bg-zinc-700 dark:text-white"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Post
            </button>
          </form>

          {comments.length > 0 ? (
            <ul className="space-y-3">
              {comments.map((c, i) => (
                <li key={i} className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      👤 {c.user}
                    </span>
                    <span className="text-xs text-gray-500">{c.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 mt-1">{c.text}</p>
                  <button
                    onClick={() => handleDeleteComment(i)}
                    className="text-xs text-red-500 hover:underline mt-1"
                  >
                    🗑 Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
