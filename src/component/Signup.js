import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/signup", {
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
      navigate("/", { replace: true });
      alert("welcome");
    }
  };
  return (
    <div>
      <hr className="text-white" />
      <div className="col-12 col-md-3 w-full mx-auto text-white bg-dark p-4 rounded-2">
        <form className="" onSubmit={handelSubmit}>
          <h3>New User</h3>
          <p>Make an account by filling out the form below.</p>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="name" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" name="email" onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
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
