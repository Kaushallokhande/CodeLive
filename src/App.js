import React, { useState, useEffect,useContext, use } from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import { useMeetContext } from "./context/MeetContext";
import { AuthContext } from "./context/AuthContext";
import { socket } from "./socket";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MeetingPage from "./components/MeetingPage";
import CodeEditor from "./components/CodeEditor";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./utils/api";

const App = () => {
  const { darkMode } = useMeetContext();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "white";
  }, [darkMode]);
  
  const JoinRoomRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { userId, loading } = useContext(AuthContext);
    const { setSuccess, setError, setLoadingJoin, setMeetingId, setPassword } = useMeetContext();
  
    useEffect(() => {
      if (loading || !userId) return;
  
      const handleJoinMeeting = async () => {
        try {
          setLoadingJoin(true);
          setError(null);
  
          const token = localStorage.getItem("token");
          const meetId = searchParams.get("meetId");
          const pass = searchParams.get("password");

          const response = await api.post(
            "/rooms/join",
            { roomId: meetId, password: pass },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setSuccess("Joined meeting successfully!");
  
          if (!socket.connected) socket.connect();
          
          setMeetingId(meetId);
          setPassword(pass);
          socket.emit("join-room", { roomId: meetId, userId, username: response.data.username });
          socket.emit("user-joined", { id: userId, username:response.data.username });
          navigate("/code", { state: { meetingId: meetId, password: pass } });
          
        } catch (err) {
          setError(err.response?.data?.message || "Failed to join meeting");
        } finally {
          setLoadingJoin(false);
        }
      };
  
      handleJoinMeeting();
    }, [loading, userId]); 
  
    return <p>Joining the meeting...</p>;
  };
  
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/signup" element={<SignupForm/>} />
      <Route path="/joinroom" element={<JoinRoomRedirect />} />
      <Route path="/meet" element={<ProtectedRoute element={<MeetingPage />}/>}/>
      <Route path="/code" element={<ProtectedRoute element={<CodeEditor />}/>} />
    </Routes>
  );
};

export default App;
