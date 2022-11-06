import React, { useContext, useEffect, useState } from "react";
import movieContext from "./context/movie/movieContext";
import MovieCard from "./MovieCard";

const Cast = () => {
  const { movies, moviesCount, payLoading } = useContext(movieContext);
  const [page, setPage] = useState(0);

  useEffect(() => {
    payLoading({ page, text: "cast" });
    // eslint-disable-next-line
  }, [page]);
  console.log(movies, moviesCount);

  const fetchMoreData = () => {
    setPage((page) => page + 1);
  };
  return <MovieCard fetchMoreData={fetchMoreData} moviesCount={moviesCount} movies={movies}/>;
};

export default Cast;
