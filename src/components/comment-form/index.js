import { memo, useState, useCallback, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import debounce from "lodash.debounce";
import CommentLink from "../../components/comment-link";
import "./style.css";

const CommentsForm = (props) => {
  const cn = bem("CommentForm");
  const [value, setValue] = useState(props.value);
  const css = props.articleArea ? "" : cn("bottomForm");

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

  const btn = props.articleArea ? null : (
    <button type='button' className={cn('btn')} onClick={props.onCancel}>Отмена</button>
  );

  return (
    <div className={css}>
      {props.exists ? (
        <form className={cn('form')} onSubmit={callbacks.onSubmit}>
          <label htmlFor="comment" className={cn('label')}>Новый комментарий</label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Текст"
            className={cn('textarea')}
            value={value}
            onChange={onChange}
          />
          <div className="buttons">
            <button type="submit" className={cn('btn')}>Отправить</button>
            {btn}
          </div>
        </form>
      ) : (
        <CommentLink articleArea={props.articleArea} onCancel={props.onCancel}/>
      )}
    </div>
  );
};

CommentsForm.propTypes = {
  value: PropTypes.string,
  articleArea: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

CommentsForm.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
  onChange: () => {},
};

export default memo(CommentsForm);