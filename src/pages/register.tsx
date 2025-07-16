import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://saa-s-login-page.vercel.app/users/register", {
        email,
        username,
        password,
        phone,
        country,
      });

      setMessage(res.data.message || "Registered successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Registration failed");
      } else {
        setMessage("Registration failed");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "https://saa-s-login-page.vercel.app/auth/google";
    } catch (error) {
      setMessage("Login Failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-4 space-y-6 lg:min-h-screen">
      <div className="bg-yellow-300 rounded-xl p-4 flex justify-center items-center w-1/4 sm:w-1/4 md:w-1/10">
        <img
          src="/images/G.png"
          alt="Login Illustration"
          className="object-contain max-h-16 sm:max-h-20 md:max-h-24"
        />
      </div>

      <div className="text-center">
        <h1 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
          Hi There!
        </h1>
        <h4 className="font-sans font-medium text-xs sm:text-sm md:text-base mt-2 text-gray-800">
          Register your account
        </h4>
      </div>

      {message && <p className="text-sm text-center text-red-600">{message}</p>}

      <hr className="w-full border-t border-gray-300 max-w-md" />

      <div className="w-full max-w-md flex flex-col items-start space-y-1">
        <label
          htmlFor="emailInput"
          className="text-xs sm:text-sm font-medium text-gray-700"
        >
          Enter Your Email
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black-400"
        />
      </div>

      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="username"
            className="text-xs sm:text-sm font-medium text-gray-700"
          >
            Enter Your Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black-400"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="password"
            className="text-xs sm:text-sm font-medium text-gray-700"
          >
            Enter Your Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black-400"
          />
        </div>
      </div>

      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="phoneNo"
            className="text-xs sm:text-sm font-medium text-gray-700"
          >
            Enter Your Phone Number
          </label>
          <input
            id="phoneNo"
            type="tel"
            maxLength={11}
            pattern="\d{11}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black-400"
            placeholder="e.g. 03123456789"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="country"
            className="text-xs sm:text-sm font-medium text-gray-700"
          >
            Select Your Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-black-400"
          >
            <option value="">Select Country</option>
            <option value="PK">Pakistan</option>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleRegister}
        className="w-full max-w-md bg-yellow-400 text-white py-2 rounded-full hover:bg-yellow-500 text-lg font-bold"
      >
        Register
      </button>

      <hr className="border-0.5 border-gray-300 w-full"></hr>
      <p>Or</p>

      {/* <button onClick={handleGoogleLogin} className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white text-gray-800 py-3 rounded-full border-1 hover:text-black text-lg font-bold disabled:opacity-50">
        Continue with Google
      </button> */}

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full lg:w-[68%] px-4 py-3 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full "
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="mr-2"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
        </svg>
        Sign in with Google
      </button>

      <p className="text-xs sm:text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
