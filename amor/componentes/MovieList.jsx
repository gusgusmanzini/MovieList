import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../src/index.css";
const movies = [
  "La dama y el vagabundo",
  "Enredados",
  "Cenicienta",
  "Frozen",
  "Hercules",
  "Aladdin",
  "Tarzan",
  "Zootopia",
  "Frozen 2",
  "Con todos menos contigo",
];

export default function ValentinesMovieList() {
  const [checkedMovies, setCheckedMovies] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('checkedMovies')) || [];
    setCheckedMovies(savedMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedMovies', JSON.stringify(checkedMovies));
  }, [checkedMovies]);

  const handleCheck = (movie) => {
    setCheckedMovies((prev) =>
      prev.includes(movie) ? prev.filter((m) => m !== movie) : [...prev, movie]
    );
  };

  const progress = (checkedMovies.length / movies.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 flex flex-col items-center p-4">
      <h1 className="text-4xl font-extrabold text-red-600 mb-6 font-valentine">Valentine's Movie List ❤️</h1>
      <motion.div 
        className="w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-center font-counter mt-3">
          {checkedMovies.length} of {movies.length} movies watched
        </p>
      </motion.div>
      <ul className="w-full max-w-md bg-white p-5 rounded-3xl shadow-2xl">
        <AnimatePresence>
          {movies.map((movie, index) => (
            <motion.li
              key={movie}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between py-3 border-b last:border-none"
            >
              <label className="flex items-center space-x-3 text-gray-800 font-semibold text-lg">
                <motion.input
                  type="checkbox"
                  checked={checkedMovies.includes(movie)}
                  onChange={() => handleCheck(movie)}
                  className="w-6 h-6 text-pink-500 focus:ring-pink-400 rounded-full border-gray-300"
                  whileTap={{ scale: 1.2 }}
                />
                <motion.span
                  className={`font-movie font-bold transition-colors duration-300 ${checkedMovies.includes(movie) ? 'checked' : ''}`}
                  animate={{ color: checkedMovies.includes(movie) ? "#a0aec0" : "#2d3748" }}
                >
                  {movie}
                </motion.span>
              </label>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
