import React from "react";
import Movie from "./Movie";
import InfiniteScroll from "react-infinite-scroll-component";

const MovieCard= ({movies, fetchMoreData, moviesCount}) => {
    
  return (
    
        <InfiniteScroll dataLength={movies.length} next={fetchMoreData} hasMore={moviesCount !== movies.length} loader={<h4>Loading...</h4>}>
          {!movies.length &&<h1 className="text-center text-white">Sorry Try Something else</h1>}
          <div className="container">
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
  )
}

export default MovieCard

