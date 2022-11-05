import React, { useContext, useEffect } from "react";
import movieContext from "./context/movie/movieContext";
import MovieComments from "./MovieComments";
import NewComment from "./NewComment";

export default function MovieDetails() {
  const movie_context = useContext(movieContext);
  const { movieDetails, getAllComments, movieComments } = movie_context;
  if (!movieDetails) {
    console.log("not found");
  }
  useEffect(() => {
    getAllComments(movieDetails._id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <hr className="text-white" />
      <div className="d-flex flex-column flex-md-row">
        <div className="col-12 col-md-8 mx-md-5 ">
          <p className="text-white text-center fs-3">{movieDetails.title}</p>
          <p className="text-white text-center">
            <span className="rounded-pill bg-dark mx-2 p-2">{parseInt(movieDetails.year)}</span>
            {movieDetails.rated && <span className="rounded-pill bg-warning mx-2 p-1">{movieDetails.rated}</span>}
          </p>
          {movieDetails.directors && <p className="text-center text-white">Directed by: {movieDetails.directors.toString()}</p>}
          {movieDetails.runtime && <p className="text-white text-center">Runtime: {movieDetails.runtime}</p>}
          {movieDetails.fullplot && <p className="bg-dark rounded p-3 text-white ">{movieDetails.fullplot}</p>}
          <div className="">
            <h4 className="text-white mb-3">
              Imdb Rating: {movieDetails.imdb.rating}/10 (from {movieDetails.imdb.votes} reviews)
            </h4>
            <div className="progress mb-3">
              <div className="progress-bar" role="progressbar" aria-valuenow={movieDetails.imdb.rating} aria-valuemin="0" aria-valuemax="10" style={{ width: `${movieDetails.imdb.rating * 10}% ` }}></div>
            </div>
          </div>
          {movieDetails.metacritic && (
            <div className="">
              <h4 className="text-white mb-3">Metacritic Rating:{movieDetails.metacritic}</h4>
              <div className="progress mb-2">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${parseInt(movieDetails.metacritic) * 10}% ` }} aria-valuenow="4" aria-valuemin="0" aria-valuemax="10"></div>
              </div>
            </div>
          )}
          {movieDetails.tomatoes && (
            <div className="">
              <h4 className="text-white mb-3">
                Tomatoes Rating: {movieDetails.tomatoes.viewer.rating}/10 (from {movieDetails.tomatoes.viewer.numReviews} reviews)
              </h4>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${movieDetails.tomatoes.viewer.rating * 10}% ` }}
                  // aria-valuenow={`${parseFloat(movieDetails.tomatoes.viewer.rating)}`}
                  aria-valuemin="0"
                  aria-valuemax="10"
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* --------------------------------------------------------------------------------- */}
        <div className="my-3 col-12 col-md-3 ">
          <div className="text-center">
            <img src={movieDetails.poster} className="card-img-top mb-1" alt="..." />
            <button className="btn btn-success mt-3">WATCH MOVIE</button>
            {movieDetails.genres && (
              <div className="mt-4">
                <p className="text-white">Genres</p>
                {movieDetails.genres.map((item, index) => {
                  return (
                    <a href="/" className="mx-1 btn btn-sm btn-dark" key={index}>
                      {item}
                    </a>
                  );
                })}
              </div>
            )}
            {movieDetails.cast && (
              <div className="mt-4">
                <p className="text-white">Cast</p>
                {movieDetails.cast.map((item, index) => {
                  return (
                    <a href="/" className="mx-1 my-1 btn btn-sm btn-success" key={index}>
                      {item}
                    </a>
                  );
                })}
              </div>
            )}
            {movieDetails.writers && (
              <div className="mt-4">
                <p className="text-white">Writers</p>
                {movieDetails.writers.map((item, index) => {
                  return (
                    <a href="/" className="mx-1 my-1 btn btn-sm btn-success" key={index}>
                      {item}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-success d-inline">Comments</h1>
        {localStorage.getItem("token") && <NewComment movieid={movieDetails._id} />}
        {movieComments.length > 0 && <MovieComments comments={movieComments} />}
        {movieComments.length === 0 && <p className="text-white">No Comment Found</p>}
      </div>
    </div>
  );
}
