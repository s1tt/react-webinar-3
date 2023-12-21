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
  t,
  lang,
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
        <span className="comment-date">
          {formatDate(comment.dateCreate, lang)}
        </span>
      </div>

      <p className="comment-text">{comment.text}</p>
      <button className="comment-replyBtn" type="button" onClick={onReplyClick}>
        {t("comments.answerBtn")}
      </button>
      {isAuth
        ? isReplyFormVisible && (
            <CommentForm
              commentId={comment._id}
              setFormValue={setFormValue}
              formValue={formValue}
              submitForm={submitForm}
              label={t("comments.newReplyTitle")}
              isResetButtonActive={true}
              onResetReplyForm={onResetReplyForm}
              t={t}
            />
          )
        : isReplyFormVisible && (
            <CommentNotAuth
              actionText={t("comments.authErr.reply")}
              isResetButtonActive={true}
              onResetReplyForm={onResetReplyForm}
              t={t}
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
