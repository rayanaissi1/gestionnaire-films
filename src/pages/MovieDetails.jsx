import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { movieService } from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);

      // Vérifier d'abord si c'est un film personnalisé
      const customMovies = JSON.parse(
        localStorage.getItem("customMovies") || "[]"
      );
      const customMovie = customMovies.find(
        (movie) => movie.id.toString() === id
      );

      if (customMovie) {
        setMovie(customMovie);
      } else {
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      }

      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des détails du film");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retour
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Film non trouvé</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Retour
        </button>
      </div>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        ← Retour
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={
                movie.isCustom
                  ? "/placeholder-movie.jpg"
                  : movieService.getImageUrl(movie.poster_path)
              }
              alt={movie.title}
              className="w-full h-96 md:h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder-movie.jpg";
              }}
            />
          </div>

          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              {movie.isCustom && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Film personnalisé
                </span>
              )}
            </div>

            <div className="mb-4 flex flex-wrap gap-4">
              <div>
                <span className="font-semibold">Année: </span>
                <span>{releaseYear}</span>
              </div>

              {!movie.isCustom && movie.vote_average && (
                <div>
                  <span className="font-semibold">Note: </span>
                  <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                </div>
              )}

              {movie.runtime && (
                <div>
                  <span className="font-semibold">Durée: </span>
                  <span>{movie.runtime} minutes</span>
                </div>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold">Genres: </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed">
                {movie.overview || "Aucune description disponible."}
              </p>
            </div>

            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">
                    Sociétés de production:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies.map((company) => (
                      <span
                        key={company.id}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
