import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { userId } = useContext(AuthContext);
  return userId ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
