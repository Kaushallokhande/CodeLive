import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useMeetContext } from "./context/MeetContext";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MeetingPage from "./components/MeetingPage";
import CodeEditor from "./components/CodeEditor";
import ProtectedRoute from "./components/ProtectedRoute";
import JoinRoom from "./components/JoinRoom";

const App = () => {
  const { darkMode } = useMeetContext();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "white";
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/joinroom" element={<JoinRoom />} />
      <Route path="/meet" element={<ProtectedRoute element={<MeetingPage />} />} />
      <Route path="/code" element={<ProtectedRoute element={<CodeEditor />} />} />
    </Routes>
  );
};

export default App;
