import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import AddMovie from './pages/AddMovie';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recherche" element={<Search />} />
            <Route path="/ajouter" element={<AddMovie />} />
            <Route path="/film/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;