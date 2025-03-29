import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateUser = (id, name) => {
    setUserId(id);
    setUsername(name);
  };
  
  useEffect(() => {
    if (userId && username) {
      console.log("Login successful:", userId, username);
    }
  }, [userId, username]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/auth/");
          updateUser(response.data.id, response.data.username);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signup = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/auth/signup", { username, email, password });
      localStorage.setItem("token", response.data.token);
      updateUser(response.data.id, response.data.username);
      navigate("/login");
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
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ userId, username, updateUser, signup, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};