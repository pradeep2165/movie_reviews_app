import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import movieContext from "./context/movie/movieContext";

export default function Navbar() {
  const { payLoading, setMovies, setMoviesCount } = useContext(movieContext);
  const [data, setData] = useState({
    content: "",
    text: "",
    page: 0,
  });
  const onChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handelSubmit =  () => {
    setMovies([])
    setMoviesCount(0)
     payLoading(data);
     navigate("/", { replace: true });
    setData({ content: "", page: 0 });
    document.getElementsByClassName("btn-close")[0].click();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse d-flex flex-column flex-md-row" id="navbarSupportedContent">
            <div className="col-md-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className="fa-solid fa-magnifying-glass text-white mx-5 mt-4"/>              
            </div>
            <div className="col-md-4 justify-content-center d-flex">
              <Link to="/" className="text-white fs-1">
                Movies
              </Link>
            </div>
            <div className="col-md-4 justify-content-end d-flex">
              {!localStorage.getItem("token") && (
                <ul className="navbar-nav d-flex flex-row">
                  <li>
                    <Link className="nav-link btn btn-dark mx-1 p-1" role="button" to="/login">
                      LOG IN
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link btn btn-dark mx-1 p-1" role="button" to="/signup">
                      SIGN UP
                    </Link>
                  </li>
                </ul>
              )}
              {localStorage.getItem("token") && (
                <ul className="navbar-nav d-flex flex-row">
                  <li>
                    <Link className="nav-link btn btn-dark mx-1 p-1" role="button" to="" onClick={logoutHandler}>
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search Movie
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            <div className="form-control">
              <input type="text" className="form-control" name="content" onChange={onChange} value={data.content} />
            </div>
            <div className="modal-body d-flex flex-row">
            
              <div className="form-check">
              <label className="form-check-label ">
                <input type="radio" className="form-check-input mx-1" name="text" value="name" onChange={onChange} />
                Name</label>    
              </div>
              <div className="form-check">
                <label className="form-check-label">
                <input type="radio" className="form-check-input mx-1" name="text" value="country" onChange={onChange} />
                  Country</label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                <input type="radio" className="form-check-input mx-1" name="text" value="genres" onChange={onChange} />
                  Genres</label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                <input type="radio" className="form-check-input mx-1" name="text" value="cast" onChange={onChange} />
                  Cast</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handelSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
