import React, { useContext, useState } from "react";
import movieContext from "./context/movie/movieContext";

export default function NewComment(props) {
  const { addComment } = useContext(movieContext);
  const [data, setData] = useState({
    comment: "",
    movieId: props.movieid,
  });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handelSend = async () => {
    await addComment(data);
    setData({ comment: "" });
  };
  return (
    <div className="text-end bg-white p-1 rounded mt-2">
      <div className="">
        <textarea className="form-control mb-2" placeholder="Leave a comment here" name="comment" id="floatingTextarea" rows="5" onChange={onChange} value={data.comment}></textarea>
        <button className="btn btn-success" onClick={handelSend}>
          Send
        </button>
      </div>
    </div>
  );
}
