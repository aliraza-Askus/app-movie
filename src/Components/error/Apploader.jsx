/** @format */

import { Outlet } from "react-router-dom";
import { Footer } from "../../Components/ui/Footer";
import { Header } from "../../Components/ui/Header";
import { useNavigation } from "react-router-dom";
export const Apploader = () => {
  const navigate = useNavigation();
  if (navigate.state === "loading") {
    return (
      <div className="justify-center items-center flex mb-10">
        <button className="bg-red-800 text-black  rounded-lg   mt-10 px-8 py-2 font-bold hover:bg-red-500">
          Loading.....
        </button>
        .
      </div>
    );
  }
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
