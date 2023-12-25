import React from "react";
import "./styles.css";

const MAX_NESTING = 10; // MAX 15

const CommentLayout = ({ children, level }) => {
  return (
    <div
      className={
        level <= MAX_NESTING
          ? "commentLayout-" + level
          : "commentLayout-" + MAX_NESTING
      }
    >
      {children}
    </div>
  );
};

export default CommentLayout;
