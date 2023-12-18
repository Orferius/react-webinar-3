import {memo} from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import "./style.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const AuthMenu = ({logOut, navigateToLogin}) => {
  const cn = bem("AuthMenu");
  const { username, isAuthenticated, profileLink, setIsAuthenticated } = useAuth();

  const callbacks = {
    logOut: async () => {
      await logOut();
      setIsAuthenticated(false);
      navigateToLogin();
    },
    navigateToLogin: () => navigateToLogin()
  }

  return (
    <div className={cn()}>
      <div className={cn("container")}>
        {isAuthenticated && (
          <Link to={profileLink} className={cn("user")}>
            {username}
          </Link>
        )}
        <button
          onClick={
            isAuthenticated ? callbacks.logOut : callbacks.navigateToLogin
          }
          className={cn("btn")}
        >
          {isAuthenticated ? 'Выход' : 'Вход'}
        </button>
      </div>
    </div>
  );
};

AuthMenu.propTypes = {
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  profileLink: PropTypes.string,
  logOut: PropTypes.func,
  navigateToLogin: PropTypes.func,
};

AuthMenu.defaultProps = {
  logOut: () => {},
  navigateToLogin: () => {},
};

export default memo(AuthMenu);