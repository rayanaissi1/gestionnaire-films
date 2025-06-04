import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { movieService } from "../services/api";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm(query);
      setHasSearched(true);

      const data = await movieService.searchMovies(query);
      setMovies(data.results);
    } catch (err) {
      setError("Erreur lors de la recherche");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Rechercher des Films
      </h1>

      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {hasSearched && !loading && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Résultats pour "{searchTerm}" ({movies.length} film
            {movies.length !== 1 ? "s" : ""})
          </h2>
        </div>
      )}

      {movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {hasSearched && !loading && movies.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Aucun film trouvé pour votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
