import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import {sortData} from "./../../utils";

function SelectCategory(props) {
  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select className="SelectCategory" value={props._id} onChange={onSelect}>
      <option key="all" value="">
        Все
      </option>
      {sortData(props.options).map((item) => (
        <option key={item.title} value={item._id}>
          {"- ".repeat(item.depth)}{item.title}
        </option>
      ))}
    </select>
  );
}

SelectCategory.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

SelectCategory.defaultProps = {
  onChange: () => {},
};

export default memo(SelectCategory);