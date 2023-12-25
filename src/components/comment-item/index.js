import PropTypes from "prop-types";
import React from "react";
import { formatDate } from "../../utils/date-format";
import CommentForm from "../comment-form";
import CommentLayout from "../comment-layout";
import CommentNotAuth from "../comment-notAuth";
import "./styles.css";

const CommentItem = ({
  currentUsername,
  formValue,
  isAuth,
  isReplyFormVisible,
  comment,
  onReplyClick,
  onResetReplyForm,
  setFormValue,
  submitForm,
  smoothScrollElementRef,
  selectedComment,
  t,
  lang,
}) => {
  return (
    <>
      <CommentLayout level={comment.level}>
        <div className="comment">
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
          <button
            className="comment-replyBtn"
            type="button"
            onClick={() => onReplyClick(comment)}
          >
            {t("comments.answerBtn")}
          </button>
        </div>
      </CommentLayout>

      {isReplyFormVisible && (
        <CommentLayout
          level={selectedComment ? selectedComment.level + 1 : comment.level}
        >
          {isAuth ? (
            <CommentForm
              smoothScrollElementRef={smoothScrollElementRef}
              setFormValue={setFormValue}
              formValue={formValue}
              submitForm={submitForm}
              label={t("comments.newReplyTitle")}
              isResetButtonActive={true}
              onResetReplyForm={onResetReplyForm}
              t={t}
            />
          ) : (
            <CommentNotAuth
              smoothScrollElementRef={smoothScrollElementRef}
              actionText={t("comments.authErr.reply")}
              isResetButtonActive={true}
              onResetReplyForm={onResetReplyForm}
              t={t}
            />
          )}
        </CommentLayout>
      )}
    </>
  );
};

CommentItem.propTypes = {
  currentUsername: PropTypes.string,
  formValue: PropTypes.string,
  lang: PropTypes.string,
  isAuth: PropTypes.bool,
  isReplyFormVisible: PropTypes.bool,
  comment: PropTypes.object,
  onReplyClick: PropTypes.func,
  onResetReplyForm: PropTypes.func,
  setFormValue: PropTypes.func,
  submitForm: PropTypes.func,
  t: PropTypes.func,
  smoothScrollElementRef: PropTypes.object,
  selectedComment: PropTypes.object,
};

CommentItem.defaultProps = {
  selectedComment: null,
  onReplyClick: () => {},
  t: () => {},
  onResetReplyForm: () => {},
  setFormValue: () => {},
  submitForm: () => {},
};

export default CommentItem;
