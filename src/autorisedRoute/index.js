import { useEffect, memo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import Spinner from "../components/spinner";

const AuthorisedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <Spinner active/>;
  }

  if (!localStorage.getItem('token')) {
    navigate("/login");
  }

  return <Outlet />;
};

export default memo(AuthorisedRoute);