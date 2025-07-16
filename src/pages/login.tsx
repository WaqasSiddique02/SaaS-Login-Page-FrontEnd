import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import OTPForm from "./verify-otp";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://saa-s-login-page.vercel.app/auth/login", {
        email,
        password,
      });
      setMessage(res.data.message || "OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Login failed");
      } else {
        setMessage("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "https://saa-s-login-page.vercel.app/auth/google";
    } catch (error) {
      setMessage("Login Failed");
    }
  };

  if (otpSent) {
    return <OTPForm email={email} />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full space-y-4 lg:h-screen">
      <div className="bg-yellow-300 rounded-xl p-4 flex justify-center items-center w-1/4 sm:w-1/6 md:w-1/8 lg:w-2/18">
        <img
          src="/images/G.png"
          alt="Login Illustration"
          className="object-contain max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-32"
        />
      </div>

      <div className="text-center">
        <h1 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
          Welcome Back!
        </h1>
        <h4 className="font-sans font-medium text-xs sm:text-sm md:text-base mt-1 sm:mt-2 text-gray-800">
          Login to your account
        </h4>
      </div>

      {message && <p className="text-sm text-center text-red-600">{message}</p>}

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-start space-y-1">
        <label
          htmlFor="emailInput"
          className="text-xs md:text-sm font-medium text-gray-700"
        >
          Enter Your Email
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black-400"
        />
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-start space-y-1">
        <label
          htmlFor="password"
          className="text-xs md:text-sm font-medium text-gray-700"
        >
          Enter Your Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black-400"
        />
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-between items-center">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="h-4 w-4 text-blue-950" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Remember Me
          </span>
        </label>

        <Link
          to={"/sendOtp"}
          className="text-xs sm:text-sm text-blue-600 hover:underline"
        >
          Recover Password
        </Link>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-yellow-400 text-white py-3 rounded-full hover:bg-yellow-500 text-lg font-bold disabled:opacity-50"
      >
        {loading ? "Sending OTP..." : "Login"}
      </button>

      <hr className="border-0.5 border-gray-300 w-full"></hr>
      <p>Or</p>

      {/* <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white text-gray-800 py-3 rounded-full border-1 hover:text-black text-lg font-bold disabled:opacity-50"
      >
        {loading ? "Signing in" : "Continue with Google"}
      </button> */}

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-[62%] px-4 py-3 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full "
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
      <p className="text-xs sm:text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to={"/register"} className="text-yellow-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
