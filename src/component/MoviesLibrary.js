import React, { useContext, useEffect, useState } from "react";
import movieContext from "./context/movie/movieContext";
import MovieCard from "./MovieCard";

export default function MoviesLibrary() {
  const context = useContext(movieContext);
  const { movies, moviesCount, payLoading } = context;
  const [page, setPage] = useState(0);
  

  useEffect(() => {
    payLoading({ page });
    // eslint-disable-next-line
  }, [page]);

  const fetchMoreData = () => {
    setPage((page) => page + 1);
  };

  return <MovieCard fetchMoreData={fetchMoreData} moviesCount={moviesCount} movies={movies} />;
}
