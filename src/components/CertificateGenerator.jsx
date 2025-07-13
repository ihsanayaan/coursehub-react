import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function CertificateGenerator({ user, courseTitle }) {
  const certRef = useRef();

  const handleDownload = async () => {
    const element = certRef.current;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = `${courseTitle}_certificate.png`;

      document.body.appendChild(link); // Required for mobile Safari
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('❌ Failed to generate certificate.');
      console.error(err);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div
        ref={certRef}
        className="w-full max-w-2xl mx-auto bg-white text-center shadow-xl rounded-lg p-8 border-8"
        style={{
          borderImage: 'linear-gradient(to right, #4f46e5, #22c55e, #06b6d4, #f59e0b) 1',
          backgroundImage: 'url(/certificate-bg.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">🎓 Certificate of Completion</h2>
        <p className="text-lg text-gray-800 mb-2">This certifies that</p>
        <h3 className="text-2xl font-semibold text-green-600 my-2">
          {user?.firstName} {user?.lastName}
        </h3>
        <p className="text-lg text-gray-800 mb-2">has successfully completed the course:</p>
        <p className="text-xl font-bold text-blue-600">{courseTitle}</p>
        <p className="text-sm text-gray-500 mt-4">📅 {new Date().toLocaleDateString()}</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          📥 Download Certificate
        </button>
      </div>
    </div>
  );
}
