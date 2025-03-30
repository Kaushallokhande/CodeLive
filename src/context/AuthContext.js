import React, { createContext, useState, useEffect,useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateUser = (id, name) => {
    setUserId(id);
    setUsername(name);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const { id, username } = decodedToken;

    const checkUserExists = async () => {
      try {
        const response = await api.get(`/auth/check-user/${id}`);
        if (!response.data.exists) {
          setLoggedIn(false);
          localStorage.removeItem("token");
        } else {
          updateUser(id, username);
          navigate("/meet");
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setLoggedIn(false);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkUserExists();
  }, []);

  const signup = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/auth/signup", { username, email, password });
      localStorage.setItem("token", response.data.token);
      updateUser(response.data.id, response.data.username);
      navigate("/meet");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      updateUser(response.data.id, response.data.username);
      navigate("/meet");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setUsername("");
    setLoggedIn(false);
    setError(null);
    setLoading(false);
    
    navigate("/login");
  };

  const authValue = useMemo(() => ({
    userId,
    username,
    signup,
    login,
    logout,
    loading,
    error,
    loggedIn,
    setLoggedIn
  }), [userId, username, loggedIn, loading, error]);

  return (
    <AuthContext.Provider value={
      authValue
    }>
      {children}
    </AuthContext.Provider>
  );
};
