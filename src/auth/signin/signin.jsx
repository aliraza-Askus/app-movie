/** @format */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAuth } from "../../Api/authapiendpoint";

const SignIn = () => {
  const [input, Setinput] = useState({
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const { signin } = UserAuth();
  const navigate = useNavigate();

  const HandleSigninInput = (e) => {
    const { name, value } = e.target;
    Setinput({ ...input, [name]: value });
  };

  const HandleSigninSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!input.phone || input.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending OTP to:", input.phone);

      // Send OTP to phone number
      await signin(input);

      // Navigate to verify OTP page with phone number
      navigate("/verifyotp", {
        state: { phone: input.phone },
      });
    } catch (error) {
      console.error("Signin failed in handler:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-6 border border-gray-200">
          <div className="text-center">
            <h1 className="font-extrabold text-2xl mb-2">Sign In</h1>
            <p className="text-sm text-gray-600">
              Enter your phone number to receive OTP
            </p>
          </div>

          <form onSubmit={HandleSigninSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                name="phone"
                value={input.phone}
                onChange={HandleSigninInput}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <PhoneNumber input={input} />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const PhoneNumber = ({ input }) => {
  return (
    <div className="text-sm text-gray-500">
      {input.phone && `We'll send OTP to: ${input.phone}`}
    </div>
  );
};

export default SignIn;
