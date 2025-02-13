import React, { useState, useEffect } from "react";

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
    const saveMovies = JSON.parse(localStorage.getItem("checkedMovies")) || [];
    setCheckedMovies(saveMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedMovies", JSON.stringify(checkedMovies));
  }, [checkedMovies]);

  const handleCheck = (movie) => {
    setCheckedMovies((prev) =>
      prev.includes(movie) ? prev.filter((m) => m !== movie) : [...prev, movie]
    );
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-4">
      <h1 className="text-3x1 font-bold text-red-500 mb-4">
        Lista de peliculas Sanvalentin❤️
      </h1>
      <ul className="w-full max-w-md bg-white p-4 rounded-2x1 shadow-lg">
        {movies.map((movie) => (
          <li
            key={movie}
            className="flex items-center justify-between py-2 border-b last:border-none"
          >
            <label className="flex items-center justify-betweeen py-2 border-b last:border-none">
              <input
                type="checkbox"
                checked={checkedMovies.includes(movie)}
                onChange={() => handleCheck(movie)}
                className="w-5 h-5 text-pink-500 focus:ring-ping-400 rounded-full"
              />
            </label>
            <span
              className={`text-lg ${
                checkedMovies.includes(movie)
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {movie}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
