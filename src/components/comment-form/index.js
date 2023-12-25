import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "./styles.css";

const CommentForm = ({
  formValue,
  label,
  isResetButtonActive,
  setFormValue,
  submitForm,
  onResetReplyForm,
  smoothScrollElementRef,
  t,
}) => {
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
    <form
      className="commentForm"
      onSubmit={submitForm}
      ref={smoothScrollElementRef}
    >
      <label className="commentForm-label" htmlFor="newComment">
        {label}
      </label>
      <textarea
        className={`commentForm-textarea ${
          isResetButtonActive ? "" : "commentForm-mainTextarea"
        }`}
        name="newComment"
        id="newComment"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        required={true}
      ></textarea>
      <div className="commentForm-btns">
        <button className="commentForm-btn" type="submit">
          {t("comments.sendBtn")}
        </button>
        {isResetButtonActive && (
          <button
            className="commentForm-btn"
            type="button"
            onClick={onResetReplyForm}
          >
            {t("comments.cancelBtn")}
          </button>
        )}
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  formValue: PropTypes.string,
  label: PropTypes.string,
  isResetButtonActive: PropTypes.bool,
  setFormValue: PropTypes.func,
  submitForm: PropTypes.func,
  onResetReplyForm: PropTypes.func,
  smoothScrollElementRef: PropTypes.object,
  t: PropTypes.func,
};

CommentForm.defaultProps = {
  isResetButtonActive: false,
  smoothScrollElementRef: null,
  setFormValue: () => {},
  submitForm: () => {},
  onResetReplyForm: () => {},
  t: () => {},
};

export default CommentForm;
