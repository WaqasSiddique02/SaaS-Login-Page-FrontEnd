import axios from 'axios'
import { useState } from 'react'
import ForgotPasswordOTPForm from './forgotPasswordOtp'

function SendOtpForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = async () => {
    if (!email) {
      setMessage('Please enter your email.')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post('http://localhost:3000/otp/send_otp', { 
        email,
        purpose: 'forgot_password'
      })
      setMessage(res.data.message || 'OTP sent to your email.')
      setOtpSent(true)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Failed to send OTP')
      } else {
        setMessage('Failed to send OTP')
      }
    } finally {
      setLoading(false)
    }
  }

  if (otpSent) {
    return <ForgotPasswordOTPForm email={email} />
  }

  return (
    <div className="flex flex-col justify-center items-center w-full space-y-6 lg:min-h-screen">
      <div className="bg-yellow-300 rounded-xl p-4 flex justify-center items-center w-1/4 sm:w-1/4 md:w-1/10">
        <img
          src="/images/G.png"
          alt="Logo"
          className="object-contain max-h-16 sm:max-h-20 md:max-h-24"
        />
      </div>

      <div className="text-center">
        <h1 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
          Reset Your Password
        </h1>
        <h4 className="font-sans font-medium text-xs sm:text-sm md:text-base mt-1 text-gray-800">
          Enter your email to receive a verification code
        </h4>
      </div>

      <hr className="w-full border-t border-gray-300 max-w-md" />

      <div className="w-full max-w-md flex flex-col items-start space-y-1">
        <label
          htmlFor="emailInput"
          className="text-xs sm:text-sm md:text-base font-medium text-gray-700"
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

      {message && <p className="text-red-600 text-sm text-center">{message}</p>}

      <button
        onClick={handleSendOtp}
        disabled={loading}
        className="w-full max-w-md bg-yellow-400 text-white py-3 rounded-full hover:bg-yellow-500 text-base sm:text-lg md:text-xl font-bold text-center disabled:opacity-50"
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </div>
  )
}

export default SendOtpForm