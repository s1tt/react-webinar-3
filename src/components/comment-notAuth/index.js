import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const CommentNotAuth = ({
  actionText,
  isResetButtonActive,
  onResetReplyForm,
  t,
}) => {
  const navigate = useNavigate();
  return (
    <p className="commentNotAuth">
      <button
        className="commentNotAuth-link"
        onClick={() =>
          navigate("/login", { state: { back: location.pathname } })
        }
      >
        {t("comments.authErr.login")},
      </button>
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
