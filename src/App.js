import "./App.css";
import Navbar from "./component/Navbar";
import MoviesLibrary from "./component/MoviesLibrary";
import MovieState from "./component/context/movie/MovieState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./component/MovieDetails";
import MovieComments from "./component/MovieComments";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  return (
    <MovieState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<MoviesLibrary />} />
          <Route exact path="/movies/id" element={<MovieDetails />} />
          <Route exact path="/movies/comments" element={<MovieComments />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </MovieState>
  );
}

export default App;
