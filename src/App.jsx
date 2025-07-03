import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./app/route/Pagerouting"

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
