import React, { useState } from "react";
import CommentForm from "../../components/comment-form";
import CommentList from "../../components/comment-list";
import CommentNotAuth from "../../components/comment-notAuth";
import articleActions from "../../store-redux/comments/actions";

const Comments = ({
  sortedComments,
  commentsCount,
  isAuth,
  dispatch,
  currentUsername,
}) => {
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [formValue, setFormValue] = useState("");

  const callbacks = {
    onReplyClick: (commentId) => {
      setFormValue("");
      setSelectedCommentId(commentId);
    },
    onResetReplyForm: () => {
      setFormValue("");
      setSelectedCommentId(null);
    },
    onSubmitForm: (e, parentId, type) => {
      e.preventDefault();
      const text = e.target.newComment.value;
      dispatch(articleActions.newComment(parentId, type, text));
      setFormValue("");
    },
  };

  return (
    <div className="comments">
      <CommentList
        currentUsername={currentUsername}
        comments={sortedComments}
        commentsCount={commentsCount}
        isAuth={isAuth}
        selectedCommentId={selectedCommentId}
        setFormValue={setFormValue}
        formValue={formValue}
        submitForm={callbacks.onSubmitForm}
        onReplyClick={callbacks.onReplyClick}
        onResetReplyForm={callbacks.onResetReplyForm}
      />
      {!!!selectedCommentId &&
        (isAuth ? (
          <CommentForm
            setFormValue={setFormValue}
            formValue={formValue}
            submitForm={callbacks.onSubmitForm}
            label={"Новый комментарий"}
          />
        ) : (
          <CommentNotAuth actionText={"комментировать"} />
        ))}
    </div>
  );
};

export default Comments;
