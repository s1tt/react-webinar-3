import PropTypes from "prop-types";
import React from "react";
import CommentItem from "../comment-item";
import "./styles.css";

const CommentList = ({
  currentUsername,
  comments,
  commentsCount,
  isAuth,
  selectedCommentId,
  setFormValue,
  formValue,
  submitForm,
  onReplyClick,
  onResetReplyForm,
}) => {
  return (
    <div className="commentList">
      <h3 className="commentList-title">Комментарии ({commentsCount})</h3>
      {comments &&
        comments.map((comment) => (
          <CommentItem
            key={comment._id}
            currentUsername={currentUsername}
            comment={comment}
            level={comment.level}
            isAuth={isAuth}
            isReplyFormVisible={comment._id === selectedCommentId}
            onReplyClick={() => onReplyClick(comment._id)}
            onResetReplyForm={onResetReplyForm}
            setFormValue={setFormValue}
            formValue={formValue}
            submitForm={submitForm}
          />
        ))}
    </div>
  );
};

CommentList.propTypes = {
  currentUsername: PropTypes.string,
  comments: PropTypes.array,
  commentsCount: PropTypes.number,
  isAuth: PropTypes.bool,
  selectedCommentId: PropTypes.string,
  formValue: PropTypes.string,
  setFormValue: PropTypes.func,
  submitForm: PropTypes.func,
  onReplyClick: PropTypes.func,
  onResetReplyForm: PropTypes.func,
};

CommentList.defaultProps = {
  setFormValue: () => {},
  submitForm: () => {},
  onReplyClick: () => {},
  onResetReplyForm: () => {},
};

export default CommentList;
