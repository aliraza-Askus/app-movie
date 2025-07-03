import { useLoaderData } from "react-router-dom";
import { MovieCards } from "../../Components/ui/Cards";

export const Movies = () => {
  const movies = useLoaderData();
  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies.Search.map((e) => (
          <MovieCards key={e.imdbID} watchMovie={e} />
        ))}
      </ul>
    </div>
  );
};
