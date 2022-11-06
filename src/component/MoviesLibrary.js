import React, { useContext, useEffect, useState } from "react";
import movieContext from "./context/movie/movieContext";
import Movie from "./Movie";
import InfiniteScroll from "react-infinite-scroll-component";

export default function MoviesLibrary() {
  const context = useContext(movieContext);
  const { movies, moviesCount, setMovieDetails, payLoading } = context;
  const [page, setPage] = useState(0);
  

  useEffect(() => {
    payLoading({page});
    // eslint-disable-next-line
  }, [page]);

  const fetchMoreData = () => {
    setPage((page)=>(page + 1));
  };


  console.log(movies.length, moviesCount)
  return (
    <InfiniteScroll dataLength={movies.length} next={fetchMoreData} hasMore={moviesCount !== movies.length} loader={<h4>Loading...</h4>}>
      {!movies.length &&<h1 className="text-center text-white">Sorry Try Something else</h1>}
      <div className="">
        <div className="row g-1">
          {movies.map((movie, index) => {
            return (
              movie.poster && (
                <div key={index} className="col-md-3">
                  <Movie movie={movie} />
                </div>
              )
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
}
