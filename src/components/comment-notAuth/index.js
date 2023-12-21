import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const CommentNotAuth = ({
  actionText,
  isResetButtonActive,
  onResetReplyForm,
}) => {
  return (
    <p className="commentNotAuth">
      <Link className="commentNotAuth-link" to={"/login"}>
        Войдите
      </Link>
      , чтобы иметь возможность {actionText}.
      {isResetButtonActive && (
        <button
          className="commentNotAuth-btn"
          type="button"
          onClick={onResetReplyForm}
        >
          Отмена
        </button>
      )}
    </p>
  );
};

CommentNotAuth.propTypes = {
  actionText: PropTypes.string,
  isResetButtonActive: PropTypes.bool,
  onResetReplyForm: PropTypes.func,
};

CommentNotAuth.defaultProps = {
  onResetReplyForm: () => {},
  isResetButtonActive: false,
};

export default CommentNotAuth;
