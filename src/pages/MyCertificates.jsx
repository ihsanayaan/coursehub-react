import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import courses from '../data/courses';
import CertificateGenerator from '../components/CertificateGenerator';

export default function MyCertificates() {
  const [certifiedCourses, setCertifiedCourses] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }

    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');

    const certified = courses.filter(course => {
      const isEnrolled = enrolled.includes(course.id.toString());
      const hasCertificate = localStorage.getItem(`certificate_${course.id}`) === 'true';
      return isEnrolled && hasCertificate;
    });

    setCertifiedCourses(certified);
  }, [navigate]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        🎖 My Certificates
      </h1>

      {certifiedCourses.length > 0 ? (
        <div className="space-y-4">
          {certifiedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded p-4 shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                🎓 {course.title}
              </h2>

              {/* Certificate Generator */}
              <CertificateGenerator user={user} courseTitle={course.title} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          🚫 No certificates unlocked yet. Pass a quiz to earn one!
        </p>
      )}
    </div>
  );
}
