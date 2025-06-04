import React, { useState } from "react";
import AddMovieForm from "../components/AddMovieForm";

const AddMovie = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddMovie = (movie) => {
    // Dans une vraie application, vous sauvegarderiez ceci dans une base de données
    // Pour cet exemple, nous utilisons le localStorage
    const existingMovies = JSON.parse(
      localStorage.getItem("customMovies") || "[]"
    );
    const updatedMovies = [...existingMovies, movie];
    localStorage.setItem("customMovies", JSON.stringify(updatedMovies));

    setSuccessMessage(`Le film "${movie.title}" a été ajouté avec succès !`);

    // Effacer le message après 3 secondes
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 pt-16 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Ajouter un Nouveau Film
        </h1>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 max-w-lg mx-auto">
            {successMessage}
          </div>
        )}

        <AddMovieForm onAddMovie={handleAddMovie} />
      </div>
    </div>
  );
};

export default AddMovie;
