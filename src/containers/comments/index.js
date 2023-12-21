import React, { useState } from "react";
import CommentForm from "../../components/comment-form";
import CommentList from "../../components/comment-list";
import CommentNotAuth from "../../components/comment-notAuth";
import useTranslate from "../../hooks/use-translate";
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
  const { t, lang } = useTranslate();

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
        t={t}
        lang={lang}
      />
      {!!!selectedCommentId &&
        (isAuth ? (
          <CommentForm
            setFormValue={setFormValue}
            formValue={formValue}
            submitForm={callbacks.onSubmitForm}
            label={t("comments.newCommentTitle")}
            t={t}
          />
        ) : (
          <CommentNotAuth actionText={t("comments.authErr.comment")} t={t} />
        ))}
    </div>
  );
};

export default Comments;
