import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  const cn = bem("Login");

  return (
    <div className={cn()}>
      <div className={cn("container")}>
        <button className={cn("btn")}>
          <Link to="/login" className={cn("link")}>
            Вход
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LoginBtn;