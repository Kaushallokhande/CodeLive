import React, { createContext, useState, useContext } from "react";
import api from "../utils/api";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const MeetContext = createContext();

export const MeetProvider = ({ children }) => {
  const [meetingId, setMeetingId] = useState("");
  const [password, setPassword] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here...");

  const { userId, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleCreateMeeting = async () => {
    try {
      setLoadingCreate(true);
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/rooms/",
        { name: meetingName, isPrivate, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(`Meeting created! ID: ${response.data.room.id}`);
      setMeetingId(response.data.room.id);
      setShowCreateForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create meeting");
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleJoinMeeting = async () => {
    try {
      setLoadingJoin(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!userId) {
        setError("User not found. Please log in again.");
        setLoadingJoin(false);
        return;
      }
      const response = await api.post(
        "/rooms/join",
        { roomId: meetingId, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Joined meeting successfully!");
      if (!socket.connected) socket.connect();

      socket.emit("join-room", { roomId: meetingId, userId, username });

      navigate("/code", { state: { meetingId, password } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join meeting");
    } finally {
      setLoadingJoin(false);
    }
  };

  const handleInviteJoinMeeting = async (meetId, password) => {
    try {
      setLoadingJoin(true);
      setError(null);
  
      const token = localStorage.getItem("token");
  
      const response = await api.post(
        "/rooms/join",
        { roomId: meetId, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setSuccess("Joined meeting successfully!");
      if (!socket.connected) socket.connect();
  
      socket.emit("join-room", { roomId: meetId, userId, username });
  
      navigate("/code", { state: { meetingId: meetId, password } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join meeting");
    } finally {
      setLoadingJoin(false);
    }
  };
  
  return (
    <MeetContext.Provider
      value={{
        meetingId,
        setMeetingId,
        password,
        setPassword,
        meetingName,
        setMeetingName,
        isPrivate,
        setIsPrivate,
        error,
        setError,
        success,
        setSuccess,
        users,
        setUsers,
        showCreateForm,
        setShowCreateForm,
        loadingCreate,
        setLoadingCreate,
        loadingJoin,
        setLoadingJoin,
        darkMode,
        toggleDarkMode,
        selectedLanguage,
        setSelectedLanguage,
        code,
        setCode,
        handleCreateMeeting,
        handleJoinMeeting,
        handleInviteJoinMeeting,
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeetContext = () => {
  return useContext(MeetContext);
};
