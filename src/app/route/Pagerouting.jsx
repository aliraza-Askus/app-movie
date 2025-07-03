/** @format */

import { createBrowserRouter } from "react-router-dom";
import { FetchAxios } from "../../Api/FetchdataAxios";
import { Getmoviedetails } from "../../Api/Getmoviedetails";
import { Apifetch } from "../../Api/MoviesApi";
import { Apploader } from "../../Components/error/Apploader";
import { Errorhandling } from "../../Components/error/ErrorHandling";
import { MovieDetail } from "../../Components/ui/MovieDetailBtn";
import GetApiData from "../../CRUD Operation/GetApiData";
import { Contact, ContactFormData } from "./Contact";
import { Movies } from "./Movies";
import SignIn from "../../auth/signin/signin";
import SignUp from "../../auth/signup/signup";
import VerifyOTP from "../../auth/verifyotp/verifyotp";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Apploader />,
    errorElement: <Errorhandling />,
    children: [
      {
        path: "/home",
        // element: <Home />,
        element: <FetchAxios />,
      },
      {
        path: "/contact",
        element: <Contact />,
        action: ContactFormData,
      },
      {
        path: "/movies",
        element: <Movies />,
        loader: Apifetch,
      },
      {
        path: "/movies/:movieid",
        element: <MovieDetail />,
        loader: Getmoviedetails,
      },
      {
        path: "/about",
        element: <GetApiData />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verifyotp",
        element: <VerifyOTP />,
      },
    ],
  },
]);
export default Router;
