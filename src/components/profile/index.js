import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css';

const Profile = ({ user }) => {
  const cn = bem("Profile");

  return (
    <div className={cn()}>
      <h1 className={cn("title")}>Профиль</h1>
      <div className={cn("prop")}>
        <div className={cn("label")}>Имя: </div>
        <div className={cn("value")}>{user.name}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>Телефон: </div>
        <div className={cn("value")}>{user.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>email: </div>
        <div className={cn("value")}>{user.email}</div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default memo(Profile);