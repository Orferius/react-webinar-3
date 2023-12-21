import { memo, useState, useCallback, useLayoutEffect } from "react";
import debounce from "lodash.debounce";
import CommentLink from "../../components/comment-link";
import "./style.css";

const CommentsForm = (props) => {
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce((value) => props.onChange(value), 600),
    [props.onChange]
  );

  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  useLayoutEffect(() => setValue(props.value), [props.value]);

  const callbacks = {
    onSubmit: (e) => props.onSubmit(e),
  };

  return (
    <>
      {props.exists ? (
        <form action="submit" className="form" onSubmit={callbacks.onSubmit}>
          <label htmlFor="comment" className="label">
            Новый комментарий
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Текст"
            className="textarea"
            value={value}
            onChange={onChange}
          />
          <button type="submit" className="btn">
            Отправить
          </button>
        </form>
      ) : (
        <CommentLink type="article" />
      )}
    </>
  );
};

export default memo(CommentsForm);