import PropTypes from "prop-types";
import React from "react";
import { formatDate } from "../../utils/date-format";
import CommentForm from "../comment-form";
import CommentList from "../comment-list";
import CommentNotAuth from "../comment-notAuth";
import "./styles.css";

const CommentItem = ({
  currentUsername,
  comment,
  level,
  isAuth,
  isReplyFormVisible,
  onReplyClick,
  onResetReplyForm,
  setFormValue,
  formValue,
  submitForm,
}) => {
  return (
    <div className="comment" style={{ marginLeft: level * 30 }}>
      <div className="comment-info">
        <span
          className={`comment-user ${
            comment.author.profile.name === currentUsername
              ? "comment-currentUser"
              : ""
          }`}
        >
          {comment.author.profile.name}
        </span>
        <span className="comment-date">{formatDate(comment.dateCreate)}</span>
      </div>

      <p className="comment-text">{comment.text}</p>
      <button className="comment-replyBtn" type="button" onClick={onReplyClick}>
        Ответить
      </button>
      {isAuth
        ? isReplyFormVisible && (
            <CommentForm
              commentId={comment._id}
              setFormValue={setFormValue}
              formValue={formValue}
              submitForm={submitForm}
              label={"Новый ответ"}
              isResetButtonActive={true}
              onResetReplyForm={onResetReplyForm}
            />
          )
        : isReplyFormVisible && (
            <CommentNotAuth
              actionText={"ответить"}
              isResetButtonActive={true}
              onResetReplyForm={onResetReplyForm}
            />
          )}

      {comment.parent && (
        <CommentList comments={comment.parent} level={level + 1} />
      )}
    </div>
  );
};

CommentItem.propTypes = {
  currentUsername: PropTypes.string,
  formValue: PropTypes.string,
  level: PropTypes.number,
  isAuth: PropTypes.bool,
  isReplyFormVisible: PropTypes.bool,
  comment: PropTypes.object,
  onReplyClick: PropTypes.func,
  onResetReplyForm: PropTypes.func,
  setFormValue: PropTypes.func,
  submitForm: PropTypes.func,
};

CommentItem.defaultProps = {
  onReplyClick: () => {},
  onResetReplyForm: () => {},
  setFormValue: () => {},
  submitForm: () => {},
};

export default CommentItem;
