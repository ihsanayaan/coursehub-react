import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import quizzes from '../data/quizzes';

export default function Quiz() {
  const { id } = useParams();
  const quiz = quizzes[id] || [];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [certificateUnlocked, setCertificateUnlocked] = useState(false);

  useEffect(() => {
    if (finished) {
      // Unlock certificate only if score >= 4
      if (score >= 4) {
        localStorage.setItem(`certificate_${id}`, 'true');
        setCertificateUnlocked(true);
      } else {
        localStorage.removeItem(`certificate_${id}`);
        setCertificateUnlocked(false);
      }
    }
  }, [finished, score, id]);

  const handleAnswer = (option) => {
    if (option === quiz[current].answer) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < quiz.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  if (!quiz.length) {
    return <p className="p-4 text-red-500">❌ No quiz available for this course.</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-zinc-800 rounded shadow">
      {finished ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">🎉 Quiz Completed!</h2>
          <p className="text-lg text-green-600 mb-4">
            Your score: {score} / {quiz.length}
          </p>

          {certificateUnlocked ? (
            <div className="mt-4 bg-blue-100 dark:bg-zinc-700 border border-blue-300 dark:border-zinc-600 p-4 rounded">
              🎖 <strong>Congratulations!</strong> You scored 4 or more. <br />
              Certificate unlocked! View it in{' '}
              <Link to="/certificates" className="text-blue-600 underline dark:text-blue-300">
                My Certificates
              </Link>.
            </div>
          ) : (
            <div className="mt-4 bg-yellow-100 dark:bg-zinc-700 border border-yellow-300 dark:border-zinc-600 p-4 rounded text-yellow-800 dark:text-yellow-200">
              ⚠️ You need at least 4 correct answers to unlock the certificate.
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Q{current + 1}: {quiz[current].question}
          </h2>
          <div className="space-y-2">
            {quiz[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="block w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
