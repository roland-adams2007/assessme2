import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Account() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]{11}$/;

    if (!formData.name) {
      newErrors.name = "Full name is required";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Full name can only contain letters and spaces";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 11-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        "user_details",
        JSON.stringify({ name: formData.name, phone: formData.phone })
      );
      setLoading(false);
      toast.success("Account created successfully", { autoClose: 5000 });
      navigate("/courses");
    }, 2000);
  };

  return (
    <>
      <title>AssessMe - Create Account</title>
      {/* Container with background image */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url(assets/images/notebook.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6 font-poppins">
            <i className="fas fa-user-plus text-indigo-600 mr-2" />
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 flex items-center font-poppins"
              >
                <i className="fas fa-user text-gray-600 mr-3" /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`w-full px-4 py-3 mt-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 font-poppins`}
                placeholder="Enter your full name"
                onChange={handleChange}
                value={formData.name}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            {/* Phone Number Field */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700 flex items-center font-poppins"
              >
                <i className="fas fa-phone-alt text-gray-600 mr-3" /> Phone
                Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`w-full px-4 py-3 mt-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 font-poppins`}
                placeholder="Enter your phone number"
                onChange={handleChange}
                value={formData.phone}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="mb-6">
              <button
                type="submit"
                className={`w-full py-3 rounded-md shadow-md font-poppins text-white ${
                  loading
                    ? "bg-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                } transition-all transform hover:scale-105 focus:outline-none focus:ring-opacity-50`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2 w-full">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4z"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <i className="fas fa-check mr-3" />
                    <span>Create Account</span>
                  </div>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 font-poppins">
              <p>
                By creating an account, you agree to our{" "}
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Account;
