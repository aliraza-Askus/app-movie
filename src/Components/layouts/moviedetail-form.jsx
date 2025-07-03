import { useLoaderData, useNavigate } from "react-router-dom";
const MovieDetailForm =()=>{
    const movieDetails = useLoaderData();
      const navigate = useNavigate();

    const HandleGoBack = () => {
    navigate(-1);
  };
    return(
        <>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h1 className="text-2xl font-bold mb-4">{movieDetails.Title}</h1>
      <img
        src={movieDetails.Poster}
        alt={movieDetails.Title}
        className="rounded-md bg-cover bg-center w-4/5 h-96 mt-2"
      />

      <p className="mt-4 text-gray-700">
        <strong>Plot:</strong> {movieDetails.Plot}
      </p>
      <p className="text-gray-700">
        <strong>Actors:</strong> {movieDetails.Actors}
      </p>
      <p className="text-gray-700">
        <strong>Director:</strong> {movieDetails.Director}
      </p>
      <p className="text-gray-700">
        <strong>Genre:</strong> {movieDetails.Genre}
      </p>
      
      
      <p className="text-gray-700">
        <strong>Released:</strong> {movieDetails.Released}
      </p>
      <p className="text-gray-700">
        <strong>Movie ID:</strong> {movieDetails.imdbID}
      </p>

      <button
        onClick={HandleGoBack}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Go Back
      </button>
    </div>
  </>)
}

export default MovieDetailForm;