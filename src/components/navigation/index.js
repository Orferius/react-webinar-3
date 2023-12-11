import { memo } from "react";
import { Link } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import "./style.css";

const Navigation = () => {
  const cn = bem('Navigation');
  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        <li className={cn('el')}>
          <Link to="/" className={cn('link')}>Главная</Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navigation);