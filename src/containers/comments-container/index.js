import { useCallback, useState, memo, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";
import shallowequal from "shallowequal";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import listToTree from "../../utils/list-to-tree";
import addLevel from "../../utils/addLevel/addLevel"
import CommentsLayout from "../../components/comments-layout";
import CommentHeader from "../../components/comment-header";
import CommentList from "../../components/comment-list";
import Spinner from "../../components/spinner";
import CommentForm from "../../components/comment-form";

const CommentsContainer = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [replyingState, setReplyingState] = useState({
    id: params.id,
    type: 'article',
  });

  const exists = useSelector((state) => state.session.exists);
  const userName = useSelector((state) => state.session.user);

  const callbacks = {
    loadComments: useCallback(() => dispatch(commentsActions.load(params.id)), [params.id]),

    onChange: useCallback((value) => setText(value), []),

    onSubmit: useCallback((e) => {
        e.preventDefault();
        dispatch(commentsActions.send(replyingState.id, text, replyingState.type, userName.profile?.name));
        setText("");
        callbacks.onCancel();
      }, [params.id, text]
    ),

    onReply: useCallback((commentId) => {
        setText("");
        setReplyingState({id: commentId, type: 'comment'});
      }, [setReplyingState]
    ),

    onCancel: useCallback(() => setReplyingState({ id: params.id, type: 'article' }), [setReplyingState]),
  };

  useInit(() => callbacks.loadComments(), []);

  const reduxSelect = useSelectorRedux((state) => ({
      count: state.comments.data.count,
      comments: state.comments.data.items,
      waiting: state.comments.waiting,
    }), shallowequal
  );

  const sortedComments = useMemo(() => {
    if (reduxSelect.comments && reduxSelect.comments.length > 0) {
      return addLevel(listToTree(reduxSelect.comments, "_id", "comment"))
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
            title='ответ'
            comments={sortedComments}
            onReply={callbacks.onReply}
            replyingState={replyingState}
            exists={exists}
            onCancel={callbacks.onCancel}
            onChange={callbacks.onChange}
            onSubmit={callbacks.onSubmit}
            location={location.pathname}
            userName={userName.profile?.name}
          />
          {articleArea && (
            <CommentForm
              title='комментарий'
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