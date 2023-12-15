import {memo} from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import "./style.css";
import { Link } from "react-router-dom";

const AuthMenu = ({user, logOut, navigateToLogin, profileLink}) => {
  const cn = bem("AuthMenu");

  const callbacks = {
    logOut: () => logOut(),
    navigateToLogin: () => navigateToLogin()
  }

  return (
    <div className={cn()}>
      <div className={cn("container")}>
        {user && <Link to={profileLink} className={cn("user")}>{user.name}</Link> }
        <button onClick={user ? callbacks.logOut : callbacks.navigateToLogin} className={cn("btn")}>
          {user ? 'Выход' : 'Вход'}
        </button>
      </div>
    </div>
  );
};

AuthMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }),
  logOut: PropTypes.func,
  navigateToLogin: PropTypes.func,
};

AuthMenu.defaultProps = {
  logOut: () => {},
  navigateToLogin: () => {}
}

export default memo(AuthMenu);