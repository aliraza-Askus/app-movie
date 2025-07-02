/** @format */
import axios from "axios";
import { toast } from "react-toastify";

const API_END_POINT =
  "https://api.allorigins.win/raw?url=https://apis.askussolution.tech";

export const UserAuth = () => {
  return {
    signUp: async (input) => {
      try {
        const res = await axios.post(`${API_END_POINT}/register`, input, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
          return res.data;
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Signup failed!");
        throw error;
      }
    },

    // Send OTP to phone number
    signin: async (input) => {
      try {
        const res = await axios.post(`${API_END_POINT}/sign-in`, input, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message || "OTP sent successfully!");
          return res.data;
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to send OTP!");
        throw error;
      }
    },

    // Verify OTP
    verifyOTP: async (input) => {
      try {
        const res = await axios.post(`${API_END_POINT}/verify-otp`, input, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message || "OTP verified successfully!");
          return res.data;
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Invalid OTP!");
        throw error;
      }
    },
  };
};
