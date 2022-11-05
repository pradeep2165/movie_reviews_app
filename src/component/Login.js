import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      //save the auth-token and redirect;
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("email", data.email);

      navigate("/", { replace: true });
      alert("welcome");
    }
  };
  return (
    <div>
      <hr className="text-white" />
      <div className="col-12 col-md-3 w-full mx-auto text-white bg-dark p-4 rounded-2">
        <form className="" onSubmit={handelSubmit}>
          <h3>Existing User?</h3>
          <p>Sign in below. Don't have an account?</p>
          <a href="/signup">Click here</a>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" name="email" onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={onChange} autoComplete="off" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <a href="/" className="btn btn-danger mx-2">
            Cancel
          </a>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
