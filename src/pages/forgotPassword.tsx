import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";

function ForgotPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handlePasswordUpdate = async () => {
    console.log("🔐 Attempting password update for email:", email);
    console.log("New Password:", newPassword);

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        `https://saa-s-login-page.vercel.app/users/reset_password/${email}`,
        { newPassword }
      );
      console.log("Password updated response:", res.data);
      setMessage(res.data.message || "Password updated successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Password update failed:", err);
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Failed to update password");
      } else {
        setMessage("Failed to update password");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full space-y-4 lg:h-screen">
      <div className="bg-yellow-300 rounded-xl p-4 flex justify-center items-center w-1/4 sm:w-1/6 md:w-1/8 lg:w-2/18">
        <img
          src="/images/G.png"
          alt="Forgot Password Illustration"
          className="object-contain max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-32"
        />
      </div>

      <div className="text-center">
        <h1 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
          Reset Your Password
        </h1>
        <h4 className="font-sans font-medium text-xs sm:text-sm md:text-base mt-1 sm:mt-2 text-gray-800">
          Enter a new password for your account
        </h4>
      </div>

      {message && <p className="text-sm text-center text-red-600">{message}</p>}

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-start space-y-1">
        <label
          htmlFor="newPassword"
          className="text-xs md:text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black-400"
        />
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-start space-y-1">
        <label
          htmlFor="confirmPassword"
          className="text-xs md:text-sm font-medium text-gray-700"
        >
          Re-enter New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black-400"
        />
      </div>

      <button
        onClick={handlePasswordUpdate}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-yellow-400 text-white py-3 rounded-full hover:bg-yellow-500 text-lg font-bold"
      >
        Update Password
      </button>

      <p className="text-xs sm:text-sm text-gray-600">
        Back to{" "}
        <Link to={"/login"} className="text-yellow-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;
