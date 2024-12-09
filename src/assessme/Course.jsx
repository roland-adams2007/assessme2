/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Course() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCard((prevCard) => (prevCard === cardId ? null : cardId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCard) {
      localStorage.setItem('course_code', selectedCard);
      navigate('/');
    } else {
      toast.error('Please select a course first.', { autoClose: 5000 });
    }
  };

  const CourseCard = ({ id, title, description, icon, color }) => (
    <div
      className={`p-6 rounded-xl shadow-md transition-all cursor-pointer ${
        selectedCard === id ? `border-4 border-${color}-600` : 'bg-white'
      }`}
      onClick={() => handleCardClick(id)}
    >
      <div className="flex items-center mb-4">
        <i className={`${icon} text-${color}-600 text-3xl mr-3`} />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-700 mb-3 text-lg">{description}</p>
    </div>
  );

  return (
    <>
      <title>AssessMe - Course Page</title>
      <div
        className="min-h-screen flex items-center justify-center px-4 py-8 bg-cover bg-center"
        style={{ backgroundImage: 'url(assets/images/notebook.jpg)' }} // Example background image
      >
        <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg backdrop-blur-md bg-opacity-70">
          {/* Title */}
          <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-12">
            <span className="text-indigo-600">Assess</span>Me
          </h1>
          
          {/* Course Selection */}
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-8">
            Course Selection
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <CourseCard
              id="EDU 101"
              title="EDU 101"
              description="Introduction to Education and Pedagogy"
              icon="fas fa-graduation-cap"
              color="indigo"
            />
            <CourseCard
              id="GST 111"
              title="GST 111"
              description="General Studies: Nigerian History"
              icon="fas fa-history"
              color="red"
            />
          </div>

          <div className="mt-12 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full shadow-md hover:bg-indigo-700 transition-all text-lg font-semibold"
            >
              <i className="fas fa-arrow-right mr-3" /> Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
