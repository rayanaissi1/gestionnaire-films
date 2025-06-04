import React from "react";
import { Link } from "react-router-dom";
import { movieService } from "../services/api";

const MovieCard = ({ movie }) => {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
  <div className="relative">
    <img
      src={movieService.getImageUrl(movie.poster_path)}
      alt={movie.title}
      className="w-full h-64 object-cover"
      onError={(e) => {
        e.target.src = '/placeholder-movie.jpg';
      }}
    />
    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
      ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
    </div>
  </div>

  <div className="p-4 flex flex-col flex-1 justify-between">
    <div>
      <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">{movie.title}</h3>
      <p className="text-gray-600 text-sm mb-2">Année: {releaseYear}</p>
      <p className="text-gray-700 text-sm line-clamp-3">
        {movie.overview || 'Aucune description disponible.'}
      </p>
    </div>

    <div className="mt-4">
      <Link
        to={`/film/${movie.id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Voir les détails
      </Link>
    </div>
  </div>
</div>

  );
};

export default MovieCard;
