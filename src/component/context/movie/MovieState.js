import { useEffect, useState } from "react";
import MovieContext from "./movieContext";

const MovieState = (props) => {
  const host = "http://localhost:8000";
  const notesInitial = [];
  const [movies, setMovies] = useState(notesInitial);
  const [moviesCount, setMoviesCount] = useState(0);
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieComments, setMovieComments] = useState([]);
  const [payload, setPayload] = useState({
    page: 0,
    content: "",
    text: "",
  });
  //Get all movies
  // const getAllMovies = async (data) => {
  //   console.log(data);
  //   const response = await fetch(`${host}/api/movies/allMovies`, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.

  //     headers: {
  //       "Content-Type": "application/json",
  //       page: data.page,
  //     },
  //   });

  //   const json = await response.json();
  //   setMovies(movies.concat(json[0].movies));
  //   setMoviesCount(json[1].documentCount);
  // };
  const payLoading = async (data) => {
    setPayload({ ...payload, ...data });    
  };

  
  useEffect(() => {
    getMovieBySearch(payload);
    // eslint-disable-next-line
  }, [payload]);

  //Get movie by search content
  const getMovieBySearch = async (data) => {
    let name = "";
    let genres = "";
    let country = "";
    let cast = "";
    if (data.text === "name") {
      name = data.content;
    } else if (data.text === "country") {
      country = data.content;
    } else if (data.text === "cast") {
      cast = data.content;
    } else if (data.text === "genres") {
      genres = data.content;
    }
    console.log(name, country, cast, genres, data.page);
    const response = await fetch(`${host}/api/movies/allMoviesSearch`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        name: name,
        country: country,
        cast: cast,
        genres: genres,
        page: data.page,
      },
    });
    const json = await response.json();
    

    setMovies((movies)=> movies.concat(json[0].movies));
    setMoviesCount(json[1][0].id);
    console.log(movies)
  };
  ;

  //Get all comments
  const getAllComments = async (id) => {
    const response = await fetch(`${host}/api/comments/allComments`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        movieId: id,
      },
    });
    const json = await response.json();
    setMovieComments(json);
  };

  //add comment
  const addComment = async (data) => {
    const token = localStorage.getItem("token");
    //api call
    const response = await fetch(`${host}/api/comments/addComment`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    setMovieComments(movieComments.concat(json));
  };

  const deleteComment = async (id) => {
    //api call
    const token = localStorage.getItem("token");
    const response = await fetch(`${host}/api/comments/deleteComment/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();

    const newComment = movieComments.filter((comment) => {
      return comment._id !== id;
    });
    setMovieComments(newComment);
  };
  
  return (
    <MovieContext.Provider value={{ movies, setMovies, moviesCount, movieDetails, setMovieDetails, getAllComments, movieComments, setMovieComments, addComment, deleteComment, getMovieBySearch, payLoading }}>{props.children}</MovieContext.Provider>
  );
};
export default MovieState;
