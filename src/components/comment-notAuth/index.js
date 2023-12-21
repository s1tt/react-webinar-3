import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const CommentNotAuth = ({
  actionText,
  isResetButtonActive,
  onResetReplyForm,
  t,
}) => {
  return (
    <p className="commentNotAuth">
      <Link className="commentNotAuth-link" to={"/login"}>
        {t("comments.authErr.login")},
      </Link>
      {t("comments.authErr.toBeAbleTo")} {actionText}
      {isResetButtonActive && (
        <button
          className="commentNotAuth-btn"
          type="button"
          onClick={onResetReplyForm}
        >
          {t("comments.cancelBtn")}
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
