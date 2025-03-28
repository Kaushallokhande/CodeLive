import React, { useState } from "react";
import { Box } from "@mui/material";
import Editor from "@monaco-editor/react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const CodeEditor = () => {
  const [code, setCode] = useState("// Start coding here...");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const location = useLocation();
  const { meetingId, password } = location.state || {}; // Retrieve state

  console.log("Meeting ID:", meetingId);
  console.log("Password:", password);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage} 
        code={code} 
        meetingId={meetingId} 
        password={password} 
      />
      <Editor
        defaultLanguage={selectedLanguage}
        theme={darkMode ? "vs-dark" : "vs-light"}
        value={code}
        onChange={(value) => setCode(value || "")}
      />
    </Box>
  );
};

export default CodeEditor;
