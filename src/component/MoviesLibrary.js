import React, { useContext, useEffect, useState } from "react";
import movieContext from "./context/movie/movieContext";
import Movie from "./Movie";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

export default function MoviesLibrary() {
  const context = useContext(movieContext);
  const { movies, moviesCount, setMovieDetails, payLoading } = context;
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    payLoading({page});
    // eslint-disable-next-line
  }, [page]);

  const fetchMoreData = () => {
    setPage((page)=>(page + 1));
    
  };


  function handleClick(id) {
    setMovieDetails(id);
    navigate("/movies/id", { replace: false });
  }
  console.log(movies.length, moviesCount);
  return (
    <InfiniteScroll dataLength={movies.length} next={fetchMoreData} hasMore={moviesCount !== movies.length} loader={<h4>Loading...</h4>}>
      
      <div className="">
        <div className="row g-1">
          {movies.map((movie, index) => {
            return (
              movie.poster && (
                <div key={index} className="col-md-3" onClick={() => handleClick(movie)}>
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
