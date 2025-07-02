/** @format */
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAuth } from "../../Api/authapiendpoint";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["6", "6", "6", "6"]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countdown, setCountdown] = useState(0);

  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, signin } = UserAuth();

  useEffect(() => {
    // Get phone number from navigation state
    const phone = location.state?.phone;
    if (phone) {
      setPhoneNumber(phone);
      setCountdown(60);
    } else {
      toast.error("Please enter phone number first");
      navigate("/signin");
    }
  }, [location, navigate]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 3) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste functionality for OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const digits = pastedData.replace(/[^0-9]/g, "").slice(0, 4);

    if (digits.length === 4) {
      setOtp(digits.split(""));
      inputRef.current[3]?.focus();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter complete 4-digit OTP");
      inputRef.current[0]?.focus();
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting OTP:", otpString);
      console.log("Phone number:", phoneNumber);

      const response = await verifyOTP({
        phone: phoneNumber,
        otp: otpString,
      });

      console.log("OTP verification successful:", response);

      // Store authentication data
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        console.log("Token stored successfully");
      }

      if (response.user) {
        localStorage.setItem("userData", JSON.stringify(response.user));
        console.log("User data stored successfully");
      }

      // Navigate to home page
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("OTP verification failed:", error);

      // Clear OTP inputs on error
      setOtp(["", "", "", ""]);
      inputRef.current[0]?.focus();

      // The error message is already shown by the API function
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (countdown > 0 || resendLoading) {
      return;
    }

    setResendLoading(true);
    try {
      console.log("Resending OTP to:", phoneNumber);

      // Call the signin API to resend OTP
      await signin({ phone: phoneNumber });

      // Reset countdown and clear current OTP
      setCountdown(60);
      setOtp(["", "", "", ""]);
      inputRef.current[0]?.focus();

      toast.success("OTP resent successfully!");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const goBackToSignin = () => {
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-500"
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
          <h1 className="font-extrabold text-2xl text-gray-800 mb-2">
            Verify your Number
          </h1>
          <p className="text-sm text-gray-600">
            Enter the 4-digit code sent to
          </p>
          <p className="text-sm font-semibold text-blue-600 mt-1">
            {phoneNumber}
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={submitHandler}>
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-3 mb-6">
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
                disabled={loading}
                className="w-12 h-12 border-2 border-gray-300 text-center text-xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.join("").length !== 4}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium mb-6">
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Resend and Back Options */}
          <div className="text-center space-y-3">
            <div>
              <button
                type="button"
                onClick={resendOTP}
                disabled={countdown > 0 || resendLoading}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors">
                {resendLoading
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend OTP in ${countdown}s`
                  : "Didn't receive code? Resend OTP"}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={goBackToSignin}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                ← Change phone number
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
