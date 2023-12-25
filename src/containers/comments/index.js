import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [selectedComment, setSelectedComment] = useState(null);
  const [formValue, setFormValue] = useState("");
  const { t, lang } = useTranslate();
  const { id: paramsId } = useParams();
  const smoothScrollElementRef = useRef(null);

  const callbacks = {
    onReplyClick: (comment) => {
      setFormValue("");
      setSelectedComment(comment);
    },
    onResetReplyForm: () => {
      setFormValue("");
      setSelectedComment(null);
    },
    onSubmitForm: (e) => {
      e.preventDefault();
      const text = e.target.newComment.value.trim();
      let parentId = "";
      let type = "";

      if (selectedComment) {
        parentId = selectedComment._id;
        type = "comment";
      } else {
        parentId = paramsId;
        type = "article";
      }

      if (text) {
        try {
          dispatch(articleActions.newComment(parentId, type, text));
        } catch (error) {
          console.log(error);
        }
      }
      setFormValue("");
    },
  };

  return (
    <div className="comments">
      <CommentList
        smoothScrollElementRef={smoothScrollElementRef}
        currentUsername={currentUsername}
        comments={sortedComments}
        commentsCount={commentsCount}
        isAuth={isAuth}
        selectedComment={selectedComment}
        setFormValue={setFormValue}
        formValue={formValue}
        submitForm={callbacks.onSubmitForm}
        onReplyClick={callbacks.onReplyClick}
        onResetReplyForm={callbacks.onResetReplyForm}
        t={t}
        lang={lang}
      />
      {!selectedComment &&
        (isAuth ? (
          <CommentForm
            formValue={formValue}
            label={t("comments.newCommentTitle")}
            setFormValue={setFormValue}
            submitForm={callbacks.onSubmitForm}
            t={t}
          />
        ) : (
          <CommentNotAuth actionText={t("comments.authErr.comment")} t={t} />
        ))}
    </div>
  );
};

Comments.propTypes = {
  sortedComments: PropTypes.array,
  commentsCount: PropTypes.number,
  isAuth: PropTypes.bool,
  dispatch: PropTypes.func,
  currentUsername: PropTypes.string,
};

Comments.defaultProps = {
  dispatch: () => {},
};

export default Comments;
