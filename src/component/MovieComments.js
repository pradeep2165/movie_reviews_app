import React, { useContext } from "react";
import movieContext from "./context/movie/movieContext";
export default function MovieComments(props) {
  const { deleteComment } = useContext(movieContext);
  const comments = props.comments;

  return (
    <div className=" my-2">
      {comments.map((comment, index) => {
        return (
          <div key={index} className="bg-white border border-1 border-info mb-1 rounded">
            <div className="d-flex justify-content-start">
              <div className="d-flex flex-row p-2">
                <div>
                  <i className="fa-solid fa-user border border-3 bg-info rounded-circle p-1"/>
                </div>
                <div>
                  <span className="mx-1">{comment.name}</span>
                  <span className="mx-1">{new Date(comment.date).toDateString()}</span>
                </div>
              </div>
              {localStorage.getItem("email") === comment.email && (
                <div className="mx-3 my-2">
                  <i className="fa-solid fa-trash-can border-2 rounded-circle border bg-info p-1" onClick={() => deleteComment(comment._id)}></i>
                </div>
              )}
            </div>
            <div className="p-3">{comment.text}</div>
          </div>
        );
      })}
    </div>
  );
}
