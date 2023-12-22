import { useCallback, useState, memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";
import shallowequal from "shallowequal";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentsLayout from "../../components/comments-layout";
import CommentHeader from "../../components/comment-header";
import CommentList from "../../components/comment-list";
import Spinner from "../../components/spinner";
import CommentForm from "../../components/comment-form";

const CommentsContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [replyingState, setReplyingState] = useState({
    id: params.id,
    type: 'article',
    replay: false
  });

  const callbacks = {
    loadComments: useCallback(() => {
      dispatch(commentsActions.load(params.id));
    }, [params.id]),

    onChange: useCallback((value) => setText(value), []),

    onSubmit: useCallback((e) => {
        e.preventDefault();
        dispatch(commentsActions.send(replyingState.id, text, replyingState.type));
        callbacks.loadComments();
        setText("");
        callbacks.onCancel();
      }, [params.id, text]
    ),

    onReply: useCallback((commentId) => {
        setText("");
        setReplyingState((prevState) => {
          if (prevState.id === commentId) {
            return { id: params.id, type: 'article', reply: false };
          }
          return { id: commentId, type: 'comment', reply: true };
        });
      }, [setReplyingState]
    ),

    onCancel: useCallback(() => setReplyingState({ ...replyingState, type: 'article', reply: false }), [setReplyingState]),
  };

  useInit(() => callbacks.loadComments(), []);

  const exists = useSelector((state) => state.session.exists);

  const reduxSelect = useSelectorRedux((state) => ({
      count: state.comments.data.count,
      comments: state.comments.data.items,
      waiting: state.comments.waiting,
    }), shallowequal
  );

  const sortedComments = useMemo(() => {
    if (reduxSelect.comments && reduxSelect.comments.length > 0) {
      return [
        ...treeToList(
          listToTree(reduxSelect.comments, "_id", "comment"),
          (item, level) => ({
            _id: item._id,
            text: item.text,
            level: level,
            dateCreate: item.dateCreate,
            author: {
              profile: { name: item.author.profile.name },
              _id: item.author._id,
            },
          })
        ),
      ];
    }
    return [];
  }, [reduxSelect.comments]);

  const articleArea = replyingState.type === 'article';

  return (
    <Spinner active={reduxSelect.waiting}>
      {reduxSelect.comments && (
        <CommentsLayout>
          <CommentHeader count={reduxSelect.count} />
          <CommentList
            comments={sortedComments}
            onReply={callbacks.onReply}
            replyingState={replyingState}
            exists={exists}
            onCancel={callbacks.onCancel}
            onChange={callbacks.onChange}
            onSubmit={callbacks.onSubmit}
          />
          {articleArea && (
            <CommentForm
              exists={exists}
              value={text}
              articleArea={articleArea}
              onChange={callbacks.onChange}
              onSubmit={callbacks.onSubmit}
            />
          )}
        </CommentsLayout>
      )}
    </Spinner>
  );
};

export default memo(CommentsContainer);