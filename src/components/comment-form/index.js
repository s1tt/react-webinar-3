import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router";
import "./styles.css";

const CommentForm = ({
  commentId = null,
  setFormValue,
  formValue,
  submitForm,
  label,
  isResetButtonActive = false,
  onResetReplyForm,
}) => {
  const { id } = useParams();
  const parentId = isResetButtonActive ? commentId : id;
  const type = isResetButtonActive ? "comment" : "article";
  return (
    <form
      className="commentForm"
      onSubmit={(e) => submitForm(e, parentId, type)}
    >
      <label className="commentForm-label" htmlFor="newComment">
        {label}
      </label>
      <textarea
        className="commentForm-textarea"
        name="newComment"
        id="newComment"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        required={true}
      ></textarea>
      <div className="commentForm-btns">
        <button className="commentForm-btn" type="submit">
          Отправить
        </button>
        {isResetButtonActive && (
          <button
            className="commentForm-btn"
            type="button"
            onClick={onResetReplyForm}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  commentId: PropTypes.string,
  formValue: PropTypes.string,
  label: PropTypes.string,
  isResetButtonActive: PropTypes.bool,
  setFormValue: PropTypes.func,
  submitForm: PropTypes.func,
  onResetReplyForm: PropTypes.func,
};

CommentForm.defaultProps = {
  setFormValue: () => {},
  submitForm: () => {},
  onResetReplyForm: () => {},
};

export default CommentForm;
