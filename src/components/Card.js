import React from "react";
import "./../styles/Card.css";

const Card = ({ alias, name, title, body, reactions, comments, email }) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-main">
          <span className="card-alias">{alias}</span>
          <div className="card-name" title={email}>
            {name}
          </div>
        </div>
      </div>
      <div className="card-title">{title}</div>
      <div className="card-body">{body}</div>
      <div className="card-info">
        <div className="card-likes">{reactions} Likes</div>
        <span className="card-comments">{comments} Comments</span>
      </div>
    </div>
  );
};

export default Card;
