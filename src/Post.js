import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import firebase from "firebase/compat/app";
import { db } from "./firebase";

const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    let unsubscribe;
    if (props.postId) {
      unsubscribe = db
        .collection("posts")
        .doc(props.postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  });

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(props.postId).collection("comments").add({
      text: comment,
      username: props.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={props.username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{props.username}</h3>
      </div>
      {/* {Header-> avatar+username} */}
      <img className="post__image" src={props.imageUrl} alt="" />
      {/* {image} */}
      <h4 className="post__text">
        <strong>{props.username}</strong> {props.caption}
      </h4>
      <div className="post__comments">
        {show ? (
          <div>
            {comments.map((comment) => {
              return (
                <p>
                  <strong>{comment.username}</strong> {comment.text}
                </p>
              );
            })}
            <h4 onClick={() => setShow(!show)}>
              <strong>Hide comments</strong>
            </h4>
          </div>
        ) : (
          <h4 onClick={() => setShow(!show)}>
            <strong>Show comments</strong>
          </h4>
        )}
      </div>
      {props.user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disables={!comment}
            className="post__button"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
