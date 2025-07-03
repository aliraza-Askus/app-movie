/** @format */

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Api/authapiendpoint";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isPhoneEntered, setIsPhoneEntered] = useState(false);
  const inputRef = useRef([]);
  const phoneInputRef = useRef(null);
  const navigate = useNavigate();
  const { verifyOTP } = UserAuth();

  // Generate random 4-digit OTP
  const generateRandomOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  useEffect(() => {
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 100);
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format phone number for display
  const formatPhoneNumber = (phone) => {
    if (phone.startsWith("92")) {
      return `+${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5)}`;
    }
    return phone;
  };

  // Handle phone number input
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 0 && !value.startsWith("92")) {
      if (value.startsWith("0")) {
        value = "92" + value.substring(1);
      } else if (value.length === 10) {
        value = "92" + value;
      }
    }

    setPhoneNumber(value);
  };

  // Handle phone number submission and send OTP
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 12) {
      alert(
        "Please enter a valid phone number (12 digits including country code)"
      );
      phoneInputRef.current?.focus();
      return;
    }

    setResendLoading(true);

    try {
      const generatedOTP = generateRandomOTP();
      const payload = { phone: phoneNumber, otp: generatedOTP };
      const response = await verifyOTP(payload);

      console.log("Send/Verify OTP API Response:", response.data);

      setIsPhoneEntered(true);
      setCountdown(60);
      setAttempts(0);
      clearOTP();

      alert(
        `OTP ${generatedOTP} sent to ${formatPhoneNumber(
          phoneNumber
        )} for verification!`
      );
      setTimeout(() => {
        inputRef.current[0]?.focus();
      }, 100);
    } catch (error) {
      console.error(
        "Failed to send/verify OTP:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to send/verify OTP. Please try again. Check console for details."
      );
    } finally {
      setResendLoading(false);
    }
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      inputRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRef.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (otp.every((digit) => digit !== "")) {
        submitHandler(e);
      }
    }
  };

  // Handle paste functionality
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/[^0-9]/g, "")
      .slice(0, 4);
    if (pastedData.length > 0) {
      const newOtp = ["", "", "", ""];
      for (let i = 0; i < Math.min(pastedData.length, 4); i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, 3);
      inputRef.current[nextIndex]?.focus();
    }
  };

  const clearOTP = () => {
    setOtp(["", "", "", ""]);
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  };

  // Submit OTP verification
  const submitHandler = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 4) {
      alert("Please enter complete 4-digit OTP");
      inputRef.current[0]?.focus();
      return;
    }

    if (attempts >= 3) {
      alert("Maximum attempts exceeded. Please request a new OTP.");
      clearOTP();
      return;
    }

    setLoading(true);

    try {
      const payload = {
        phone: phoneNumber,
        otp: otpString,
      };

      console.log("Calling verifyOTP API:", payload);
      const response = await verifyOTP(payload);

      console.log("VerifyOTP API Response:", response.data);

      setAttempts(0);
      alert("Login successful!");
      navigate("/home", { replace: true });
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response ? error.response.data : error.message
      );
      setAttempts((prev) => prev + 1);
      clearOTP();

      let errorMessage = "Invalid OTP. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(`${errorMessage}`);

      if (attempts + 1 >= 3) {
        alert("Maximum attempts reached. Please request a new OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (countdown > 0 || resendLoading) return;

    setResendLoading(true);

    try {
      const generatedOTP = generateRandomOTP();
      const payload = { phone: phoneNumber, otp: generatedOTP };
      const response = await verifyOTP(payload);

      console.log("Resend OTP Response:", response.data);
      setCountdown(60);
      setAttempts(0);
      clearOTP();

      alert(`New OTP ${generatedOTP} sent successfully!`);
    } catch (error) {
      console.error(
        "Failed to resend OTP:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setResendLoading(false);
    }
  };

  // Go back to phone number entry
  const goBackToPhone = () => {
    setIsPhoneEntered(false);
    setPhoneNumber("");
    setCountdown(0);
    setAttempts(0);
    clearOTP();
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 100);
  };

  const isOTPComplete = otp.every((digit) => digit !== "");
  const canSubmit = isOTPComplete && !loading && attempts < 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        {!isPhoneEntered ? (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Phone Verification
              </h1>
              <p className="text-gray-600">
                Enter your phone number to receive OTP
              </p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">+92</span>
                  </div>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="923303366910"
                    disabled={resendLoading}
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 transition-all text-lg font-medium"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Format: 92XXXXXXXXXX (12 digits)
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  resendLoading || !phoneNumber || phoneNumber.length < 12
                }
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none">
                {resendLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Verify OTP
              </h1>
              <p className="text-gray-600 mb-2">
                Enter the 4-digit code sent to
              </p>
              <p className="text-lg font-bold text-blue-600">
                {formatPhoneNumber(phoneNumber)}
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="flex justify-center gap-4 mb-8">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(element) => (inputRef.current[idx] = element)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    disabled={loading || attempts >= 3}
                    className={`w-16 h-16 border-2 text-center text-2xl font-bold rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 transition-all shadow-lg ${
                      digit
                        ? "border-blue-500 bg-blue-50 text-blue-600 shadow-blue-200"
                        : "border-gray-300"
                    } ${attempts >= 3 ? "border-red-300 bg-red-50" : ""}`}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </div>
                ) : attempts >= 3 ? (
                  "Maximum Attempts Exceeded"
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>

            <div className="flex flex-col space-y-4 text-center mt-6">
              <button
                onClick={resendOTP}
                disabled={countdown > 0 || resendLoading}
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors">
                {resendLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending new OTP...
                  </span>
                ) : countdown > 0 ? (
                  `Resend OTP in ${countdown}s`
                ) : (
                  "Didn't receive code? Resend OTP"
                )}
              </button>

              <button
                onClick={goBackToPhone}
                type="button"
                className="text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Change phone number
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
