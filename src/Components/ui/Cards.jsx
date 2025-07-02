import { NavLink } from "react-router-dom";
export const MovieCards = ({ watchMovie }) => {
  const { Poster, Title, imdbID } = watchMovie;
  return (
    <div className="">
      <img
        src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/200"}
        alt={Title}
        className="rounded-md bg-cover bg-center w-full h-96 mt-2"
      />
      <NavLink to={`/movies/${imdbID}`}>
        <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full ">
          Watch Movie
        </button>
      </NavLink>
    </div>
  );
};
