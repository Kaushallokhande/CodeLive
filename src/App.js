import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MeetingPage from "./components/MeetingPage";
import CodeEditor from "./components/CodeEditor";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const JoinRoomRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
      const joinRoom = async () => {
        const meetId = searchParams.get("meetId");
        const password = searchParams.get("password");

        if (!meetId || !password) {
          navigate("/"); // Redirect to home if params are missing
          return;
        }

        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://codelive-backend.onrender.com/api/rooms/joinroom?meetId=${meetId}&password=${password}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log(response.data);

          if (response.status === 200) {
            navigate("/code"); // Redirect to Code Editor with meetId
          }
        } catch (error) {
          console.error("Failed to join room:", error.response?.data || error.message);
          navigate("/"); // Redirect if joining fails
        }
      };

      joinRoom();
    }, [searchParams, navigate]);

    return <p>Joining the meeting...</p>;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<SignupForm setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/meet" element={<MeetingPage />} />
      <Route path="/joinroom" element={<JoinRoomRedirect />} />
      <Route path="/code" element={<ProtectedRoute element={<CodeEditor />} isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
};

export default App;
