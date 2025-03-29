import React, { createContext, useState, useContext } from "react";

// Create a context
const MeetContext = createContext();

// Create a provider component
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

  // Add missing states
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here...");
  const [file, setFile] = useState("");

  // Function to toggle dark mode
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
        file,
        setFile,
        code,
        setCode,
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

// Custom hook to use the context
export const useMeetContext = () => {
  return useContext(MeetContext);
};
