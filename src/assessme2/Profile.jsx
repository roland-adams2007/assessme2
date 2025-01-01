import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const Profile = ({setMainTab}) => {
  const cookies = new Cookies();

  const [userDetails, setUserDetails] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // State for managing loader
  const [changePasswordData, setChangePasswordData] = useState({
    phone: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  const handlePasswordChange = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

    if (storedUserDetails.phone !== changePasswordData.phone) {
      alert("Invalid phone number. Try again.");
      return;
    }

    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      alert("Passwords do not match. Please confirm your password.");
      return;
    }

    if (!passwordRegex.test(changePasswordData.newPassword)) {
      alert(
        "New password must include at least 5 characters, one uppercase letter, one number, and one special character."
      );
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Simulate a network request with a timeout
    setTimeout(() => {
      storedUserDetails.password = changePasswordData.newPassword;
      localStorage.setItem("userDetails", JSON.stringify(storedUserDetails));

      setIsLoading(false);
      alert("Password updated successfully!");
      setChangePasswordData({
        phone: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 2000);
  };

  const handleDeleteAccount = () => {
    if (localStorage.getItem("userDetails")) {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("history");
      cookies.remove("userStatus", { path: "/" });
      setMainTab('account')
      alert("Account deleted successfully!");
    } else {
      alert("You don't have an account to delete");
    }
    setDeleteConfirmation(false);
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto scrollbar flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>

      {/* Profile Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700">User Information</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue={userDetails.name}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Change Password</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="mt-1 w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={changePasswordData.phone}
              onChange={(e) =>
                setChangePasswordData({ ...changePasswordData, phone: e.target.value })
              }
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={changePasswordData.newPassword}
              onChange={(e) =>
                setChangePasswordData({ ...changePasswordData, newPassword: e.target.value })
              }
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={changePasswordData.confirmPassword}
              onChange={(e) =>
                setChangePasswordData({ ...changePasswordData, confirmPassword: e.target.value })
              }
              placeholder="Confirm your new password"
            />
          </div>
          <button
            id="changePasswordBtn"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={handlePasswordChange}
            disabled={isLoading}
          >
            {isLoading ? (
              'Updating...'
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700">Account Actions</h3>
        <p className="text-sm text-gray-500 mt-2">
          Once your account is deleted, it cannot be undone.
        </p>
        <button
          id="deleteAccountBtn"
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          onClick={() => setDeleteConfirmation(true)}
        >
          Delete Account
        </button>
      </div>

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
    </main>
  );
};

export default Profile;
