import { useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Errorhandling = () => {
  const error = useRouteError();
  const naviagte = useNavigate();

  const HandleGoBack = () => {
    naviagte(-1);
  };

  return (
    <>
      {<h1>Error: {error.status}</h1>}
      <button>
        <NavLink
          to="/home"
          className="bg-pink-600 p-2 float-end rounded-lg mx-2"
        >
          Back To Home Page
        </NavLink>
      </button>
      <button
        onClick={HandleGoBack}
        className="bg-green-600 p-2 ml-20 text-lg rounded-lg"
      >
        Go Back
      </button>
    </>
  );
};
