import React, { createContext, useState, useContext } from "react";

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

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

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
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeetContext = () => {
  return useContext(MeetContext);
};
