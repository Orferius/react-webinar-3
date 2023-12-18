import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import { useEffect, useState, useCallback } from "react";

export default function useAuth() {
  const store = useStore();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const username = useSelector((state) => state.autorization.username);
  const profileLink = "/profile";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await store.actions.autorization.checkAuth();
        store.actions.profile.setUserData(userData);
        const authState = store.getState().autorization.session;
        setIsAuthenticated(authState);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [store]);

  const memoizedSetIsAuthenticated = useCallback(
    (value) => setIsAuthenticated(value), []
  );

  return {
    username,
    isAuthenticated,
    profileLink,
    loading,
    setIsAuthenticated: memoizedSetIsAuthenticated,
  };
}