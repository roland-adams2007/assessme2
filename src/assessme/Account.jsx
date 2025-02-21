// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import { toast } from "react-toastify";

// function Account({ setTab }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     const nameRegex = /^[a-zA-Z\s]+$/;
//     const phoneRegex = /^[0-9]{11}$/;

//     if (!formData.name) {
//       newErrors.name = "Full name is required";
//     } else if (!nameRegex.test(formData.name)) {
//       newErrors.name = "Full name can only contain letters and spaces";
//     }

//     if (!formData.phone) {
//       newErrors.phone = "Phone number is required";
//     } else if (!phoneRegex.test(formData.phone)) {
//       newErrors.phone = "Enter a valid 11-digit phone number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setLoading(true);

    // setTimeout(() => {
    //   localStorage.setItem(
    //     "user_details",
    //     JSON.stringify({ name: formData.name, phone: formData.phone })
    //   );
    //   setLoading(false);
    //   toast.success("Account created successfully", { autoClose: 5000 });
    //   setTab('courses');
    // }, 2000);
//   };

//   return (
//     <>
//       <title>AssessMe - Create Account</title>
//       <div
//         className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-400"
//         style={{
//           backgroundImage: 'url(assets/images/notebook.jpg)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
//           <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
//             <i className="fas fa-user-plus text-indigo-600 mr-3" />
//             Create Your Account
//           </h2>
//           <form onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="mb-6">
//               <label
//                 htmlFor="name"
//                 className="block text-lg font-medium text-gray-700 flex items-center"
//               >
//                 <i className="fas fa-user text-gray-500 mr-3" /> Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className={`w-full px-6 py-4 mt-2 border-2 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none transition-all duration-300 ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your full name"
//                 onChange={handleChange}
//                 value={formData.name}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Phone Number Field */}
//             <div className="mb-6">
//               <label
//                 htmlFor="phone"
//                 className="block text-lg font-medium text-gray-700 flex items-center"
//               >
//                 <i className="fas fa-phone-alt text-gray-500 mr-3" /> Phone Number
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 className={`w-full px-6 py-4 mt-2 border-2 rounded-lg shadow-md focus:ring-4 focus:ring-indigo-500 focus:outline-none transition-all duration-300 ${
//                   errors.phone ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your phone number"
//                 onChange={handleChange}
//                 value={formData.phone}
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="mb-6">
//               <button
//                 type="submit"
//                 className={`w-full py-4 rounded-lg font-semibold text-white ${
//                   loading
//                     ? 'bg-gray-400'
//                     : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'
//                 } transition-all transform hover:scale-105 focus:outline-none focus:ring-opacity-50`}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4z"
//                       ></path>
//                     </svg>
//                     <span>Loading...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center">
//                     <i className="fas fa-check mr-3" />
//                     <span>Create Account</span>
//                   </div>
//                 )}
//               </button>
//             </div>

//             {/* Footer */}
//             <div className="text-center text-sm text-gray-500">
//               <p>
//                 By creating an account, you agree to our{' '}
//                 <a
//                   href="#"
//                   className="text-indigo-600 hover:text-indigo-700 underline"
//                 >
//                   Terms of Service
//                 </a>{' '}
//                 and{' '}
//                 <a
//                   href="#"
//                   className="text-indigo-600 hover:text-indigo-700 underline"
//                 >
//                   Privacy Policy
//                 </a>
//                 .
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Account;
