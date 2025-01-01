// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { toast } from 'react-toastify';

// function Course({ setTab }) {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const handleCardClick = (cardId) => {
//     setSelectedCard((prevCard) => (prevCard === cardId ? null : cardId));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedCard) {
//       localStorage.setItem('course_code', selectedCard);
//       setTab('questions');
//     } else {
//       toast.error('Please select a course first.', { autoClose: 5000 });
//     }
//   };

//   const CourseCard = ({ id, title, description, icon, color }) => (
//     <div
//       className={`relative p-6 rounded-xl shadow-lg transform transition-all cursor-pointer group hover:scale-105 ${
//         selectedCard === id
//           ? `ring-4 ring-${color}-500 bg-${color}-50`
//           : 'bg-white'
//       }`}
//       onClick={() => handleCardClick(id)}
//     >
//       <div
//         className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
//           selectedCard === id ? `bg-${color}-500` : 'bg-gray-300'
//         }`}
//       />
//       <div className="flex items-center mb-4">
//         <div
//           className={`flex items-center justify-center w-12 h-12 rounded-full bg-${color}-100 text-${color}-600 text-2xl mr-4`}
//         >
//           <i className={`${icon}`} />
//         </div>
//         <h3
//           className={`text-lg font-bold ${
//             selectedCard === id ? `text-${color}-600` : 'text-gray-900'
//           }`}
//         >
//           {title}
//         </h3>
//       </div>
//       <p className="text-gray-700 text-sm">{description}</p>
//     </div>
//   );

//   return (
//     <>
//       <title>AssessMe - Course Page</title>
//       <div
//         className="min-h-screen flex items-center justify-center px-4 py-8 bg-cover bg-center"
//         style={{ backgroundImage: 'url(assets/images/notebook.jpg)' }} // Example background image
//       >
//         <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-80">
//           {/* Title */}
//           <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">
//             <span className="text-indigo-600">Assess</span>Me
//           </h1>

//           {/* Course Selection */}
//           <h2 className="text-2xl font-medium text-center text-gray-600 mb-8">
//             Select a Course to Begin
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <CourseCard
//               id="EDU 101"
//               title="EDU 101"
//               description="Introduction to Education and Pedagogy"
//               icon="fas fa-graduation-cap"
//               color="indigo"
//             />
//             <CourseCard
//               id="GST 111"
//               title="GST 111"
//               description="General Studies: Nigerian History"
//               icon="fas fa-history"
//               color="red"
//             />
//           </div>

//           <div className="mt-12 text-center">
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all text-lg font-medium"
//             >
//               <i className="fas fa-arrow-right mr-2" /> Proceed
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Course;
