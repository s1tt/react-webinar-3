import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const CommentNotAuth = ({
  smoothScrollElementRef,
  actionText,
  isResetButtonActive,
  onResetReplyForm,
  t,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (smoothScrollElementRef && smoothScrollElementRef.current) {
      smoothScrollElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [smoothScrollElementRef]);

  return (
    <p className="commentNotAuth" ref={smoothScrollElementRef} tabIndex="0">
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
