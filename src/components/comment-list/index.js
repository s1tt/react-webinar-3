import PropTypes from "prop-types";
import React, { useMemo } from "react";
import CommentItem from "../comment-item";
import "./styles.css";

const CommentList = ({
  smoothScrollElementRef,
  currentUsername,
  comments,
  commentsCount,
  isAuth,
  selectedComment,
  setFormValue,
  formValue,
  submitForm,
  onReplyClick,
  onResetReplyForm,
  t,
  lang,
}) => {
  const lastChild = useMemo(
    () => (commentId) => {
      const targetComment = comments.findLast(
        (comment) => comment.parentId === commentId
      );
      if (targetComment) {
        return lastChild(targetComment._id);
      } else {
        return commentId;
      }
    },
    [comments]
  );

  const lastChildId = useMemo(
    () => (selectedComment) => {
      const selectedLastChild = selectedComment.lastChildId;
      return lastChild(selectedLastChild || selectedComment._id);
    },
    [lastChild]
  );

  return (
    <div className="commentList">
      <h3 className="commentList-title">
        {t("comments.title")} ({commentsCount})
      </h3>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          smoothScrollElementRef={smoothScrollElementRef}
          selectedComment={selectedComment}
          currentUsername={currentUsername}
          comment={comment}
          isAuth={isAuth}
          isReplyFormVisible={
            selectedComment && comment._id === lastChildId(selectedComment)
          }
          onReplyClick={onReplyClick}
          onResetReplyForm={onResetReplyForm}
          setFormValue={setFormValue}
          formValue={formValue}
          submitForm={submitForm}
          t={t}
          lang={lang}
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
  t: PropTypes.func,
  smoothScrollElementRef: PropTypes.object,
};

CommentList.defaultProps = {
  smoothScrollElementRef: null,
  setFormValue: () => {},
  submitForm: () => {},
  onReplyClick: () => {},
  onResetReplyForm: () => {},
  t: () => {},
};

export default CommentList;
