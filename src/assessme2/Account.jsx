/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const Account = ({ setMainTab }) => {
  useEffect(() => {
    const userStatus = cookies.get("userStatus");
    if (userStatus === "Active") {
      setMainTab("home");
    }
  }, [setMainTab]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [changePasswordData, setChangePasswordData] = useState({
    phone: "",
    newPassword: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePasswordChange = (e) => {
    setChangePasswordData({ ...changePasswordData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]{11}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

    if (!formData.name && !localStorage.getItem("userDetails")) {
      newErrors.name = "Full name is required for registration";
    } else if (formData.name && !nameRegex.test(formData.name)) {
      newErrors.name = "Full name can only contain letters and spaces";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 11-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must include at least 5 characters, one uppercase letter, one number, and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!validate()) return;
    setLoading(true);

    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const user = JSON.parse(userDetails);

      if (formData.phone !== user.phone || formData.password !== user.password) {
        setLoading(false);
        setError("Invalid credentials. Please try again.");
        return;
      }

      cookies.set("userStatus", "Active", { path: "/", maxAge: 432000 });
      setLoading(false);
      setMainTab("home");
    } else {
      setTimeout(() => {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            password: formData.password,
            status: "Active",
          })
        );
        cookies.set("userStatus", "Active", { path: "/", maxAge: 432000 }); // 1 hour cookie
        setLoading(false);
        setMainTab("home");
      }, 2000);
    }
  };

  const handlePasswordChange = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
  
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
    if (userDetails.phone !== changePasswordData.phone) {
      alert("Invalid phone number. Try again.");
      return;
    }
  
    if (!passwordRegex.test(changePasswordData.newPassword)) {
      alert(
        "New password must include at least 5 characters, one uppercase letter, one number, and one special character."
      );
      return;
    }

    userDetails.password = changePasswordData.newPassword;
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    alert("Password updated successfully!");
    setIsChangePasswordModalOpen(false);
  };
  

  const handleDeleteAccount = () => {
   if(localStorage.getItem('userDetails')){
    localStorage.removeItem("userDetails");     
     localStorage.removeItem("history");
    localStorage.removeItem('mainTab');
    localStorage.removeItem('navTab');
    cookies.remove("userStatus", { path: "/" });
    alert("Account deleted successfully!");
   }else{
      alert('You dont have account to delete');
   }
   setDeleteConfirmation(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center justify-center mb-6">
          <i
            className="fas fa-clipboard-list text-blue-500 text-4xl mr-2"
            aria-label="Account Icon"
          />
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            AssessMe Account
          </h2>
        </div>


        {localStorage.getItem('userDetails') ? (
        <p className="text-gray-600 text-sm mb-4">
          Log in to continue your progress.
        </p>
        ) : (
          <p className="text-gray-600 text-sm mb-4">
          Create an account to start assessing yourself.
        </p>
        )}

    


        {error && (
          <div className="text-red-500 text-center mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          {!(localStorage.getItem('userDetails')) && (
            <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          )}

          {/* Phone Number Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : <>
              {localStorage.getItem('userDetails') ? (
                "Login"
                ) : (
                  "Register"
                )}
            </>}
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="text-blue-500 text-sm underline"
          >
            Change Password
          </button>
          <button
            onClick={() => setDeleteConfirmation(true)}
            className="text-red-500 text-sm underline"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="changePhone"
                name="phone"
                value={changePasswordData.phone}
                onChange={handleChangePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={changePasswordData.newPassword}
                onChange={handleChangePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsChangePasswordModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation */}
      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
