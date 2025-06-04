import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600';
  };

  return (
    <header style={{ backgroundColor: '#ECF8F6' }} className="shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🎬 Filmothèque+
          </Link>
          
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className={`transition-colors ${isActive('/')}`}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/recherche" className={`transition-colors ${isActive('/recherche')}`}>
                Recherche
              </Link>
            </li>
            <li>
              <Link to="/ajouter" className={`transition-colors ${isActive('/ajouter')}`}>
                Ajouter un Film
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;