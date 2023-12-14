import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const LOGIN_URL = "/api/v1/users/sign";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [login, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ login, password }),
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/profile");
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("Нет ответа от сервера");
      } else if (
        error.response?.data.detail ===
        "No active account found with the given credentials"
      ) {
        setErrorMessage("Некорректное имя пользователя или пароль");
      } else {
        setErrorMessage("Ошибка входа");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Вход</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Логин</label>
        <input
          type="text"
          autoComplete="on"
          onChange={(e) => setLogin(e.target.value)}
          required
          className="input"
        />
        <label className="label">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <p
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <button type="submit" className="btn">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;