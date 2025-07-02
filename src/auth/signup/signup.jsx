/** @format */
import { useState } from "react";
import { UserAuth } from "../../Api/authapiendpoint";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    profile: "",
  });
  // get the signup function from UserAuth
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("Submit Input:", input);
      // call your API function
      await signUp(input);
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed in handler:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={signupSubmitHandler} className="space-y-4 p-4">
      <div>
        <label className="mr-4">First Name:</label>
        <input
          type="text"
          name="firstname"
          value={input.firstname}
          onChange={handleOnChange}
          placeholder="First Name"
          className="border p-1"
        />
      </div>
      <div>
        <label className="mr-4">Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={input.lastname}
          onChange={handleOnChange}
          placeholder="Last Name"
          className="border p-1"
        />
      </div>
      <div>
        <label className="mr-4">Email:</label>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={handleOnChange}
          placeholder="Email"
          className="border p-1"
        />
      </div>
      <div>
        <label className="mr-4">Password:</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleOnChange}
          placeholder="Password"
          className="border p-1"
        />
      </div>
      <div>
        <label className="mr-4">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={input.phone}
          onChange={handleOnChange}
          placeholder="Phone"
          className="border p-1"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default SignUp;
