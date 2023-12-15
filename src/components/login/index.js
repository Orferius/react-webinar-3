import { useState, memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Login = ({ logIn, error }) => {
  const cn = bem("Login");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const callbacks = {
    logIn: () => logIn(login, password),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callbacks.logIn(login, password);
  };

  return (
    <div className={cn()}>
      <h1 className={cn("title")}>Вход</h1>
      <form onSubmit={handleSubmit} className={cn("form")}>
        <label className={cn("label")}>Логин</label>
        <input
          type="text"
          autoComplete="on"
          onChange={(e) => setLogin(e.target.value)}
          required
          className={cn("input")}
        />
        <label className={cn("label")}>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={cn("input")}
        />
        <p
          className={error ? cn("errmsg") : cn("offscreen")}
          aria-live="assertive"
        >
          {error}
        </p>
        <button type="submit" className={cn("btn")}>
          Войти
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  error: PropTypes.string,
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
}

export default memo(Login);