import React from "react";
import "./styles.css";

const CommentLayout = ({ children, level }) => {
  return (
    <div
      className={level <= 15 ? "commentLayout-" + level : "commentLayout-15"}
    >
      {children}
    </div>
  );
};

export default CommentLayout;
