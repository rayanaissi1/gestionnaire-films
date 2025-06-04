import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "fr-FR",
  },
});

export const movieService = {
  // Récupérer les films populaires
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get("/movie/popular", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des films populaires:",
        error
      );
      throw error;
    }
  },

  // Rechercher des films
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get("/search/movie", {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche de films:", error);
      throw error;
    }
  },

  // Obtenir les détails d'un film
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du film:",
        error
      );
      throw error;
    }
  },

  // Fonction utilitaire pour construire l'URL d'image
  getImageUrl: (path) => {
    return path ? `${IMAGE_BASE_URL}${path}` : "/placeholder-movie.jpg";
  },
};
