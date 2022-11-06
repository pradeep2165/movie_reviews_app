import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import movieContext from "./context/movie/movieContext";

export default function Movie({movie}) {
  const { setMovieDetails } = useContext(movieContext);
  const navigate = useNavigate();
  function handleClick(id) {
    setMovieDetails(id);
    navigate("/movies/id", { replace: false });
  }
  return (
    <div className="card bg-dark m-auto">
      <img src={movie.poster} className="card-img-top p-2" alt="" style={{ height: "18rem" }} onClick={() => handleClick(movie)}/>
      <div className="card-body d-flex justify-content-between flex-column" style={{ height: "230px", overflow: "hidden" }}>
        <div>
          <h5 className="card-title text-success fs-6 text-center">{movie.title}</h5>
        </div>
        <div>
          <p className="text-center">
            <span className="bg-secondary border rounded-circle d-inline mx-1 p-1 ">{parseInt(movie.year)}</span>
            {movie.rated && <span className="bg-warning border rounded-pill d-inline mx-1 p-1 ">{movie.rated}</span>}
          </p>
        </div>
        <div>{movie.cast && <p className="text-white text-center">Starring: {movie.cast.toString()}</p>}</div>
        <div>
          <p className="text-center">{movie.imdb.rating >= 8 ? <span className="bg-success rounded p-2">IMDB: {movie.imdb.rating}/10</span> : <span className=" bg-primary rounded p-2">IMDB: {movie.imdb.rating}/10</span>}</p>
        </div>
      </div>
    </div>
  );
}
