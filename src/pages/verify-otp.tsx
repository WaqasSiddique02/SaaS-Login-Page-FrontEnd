import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

type OTPFormProps = {
    email: string
}

function OTPForm({ email }: OTPFormProps) {
    console.log('email:? old ', email);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const value = e.target.value
        if (/^\d$/.test(value)) {
            if (index < 5) {
                inputsRef.current[index + 1]?.focus()
            }
        } else {
            e.target.value = ''
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handleVerifyOtp = async () => {
        const otp = inputsRef.current.map((input) => input?.value).join('');

        if (otp.length !== 6) {
            setMessage('Please enter the full 6-digit code.');
            return;
        }

        try {
            setLoading(true);
            setMessage('Verifying...');

            const response = await axios.post('https://saa-s-login-page.vercel.app/otp/verify_otp', {
                email: email.trim(),
                otp: otp.trim()
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setMessage('OTP verified successfully! Redirecting...');
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'OTP verification failed';
                setMessage(errorMessage);

                inputsRef.current.forEach(input => {
                    if (input) input.value = '';
                });
                inputsRef.current[0]?.focus();
            } else {
                setMessage('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full px-4 space-y-6 lg:min-h-screen">
            <div className="bg-yellow-300 rounded-xl p-4 flex justify-center items-center w-1/4 sm:w-1/4 md:w-1/10">
                <img
                    src="/images/G.png"
                    alt="OTP Illustration"
                    className="object-contain max-h-16 sm:max-h-20 md:max-h-24"
                />
            </div>

            <div className="text-center">
                <h1 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
                    Enter OTP
                </h1>
                <h4 className="font-sans font-medium text-xs sm:text-sm md:text-base mt-1 text-gray-800">
                    We've sent a 6-digit code to <strong>{email}</strong>
                </h4>
            </div>

            <hr className="w-full border-t border-gray-300 max-w-md" />

            <div className="flex justify-center gap-3 sm:gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                    <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-10 sm:w-12 h-12 sm:h-14 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-400"
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        ref={(el) => {
                            inputsRef.current[i] = el
                        }}
                    />
                ))}
            </div>

            {message && <p className="text-red-600 text-sm text-center">{message}</p>}

            <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full max-w-md bg-yellow-400 text-white py-3 rounded-full hover:bg-yellow-500 text-lg font-bold disabled:opacity-50"
            >
                {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
        </div>
    )
}

export default OTPForm