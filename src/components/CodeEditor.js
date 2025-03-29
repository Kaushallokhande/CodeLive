import React, { useEffect, useCallback, useState, useRef } from "react";
import { Box } from "@mui/material";
import Editor, { useMonaco } from "@monaco-editor/react";
import Navbar from "./Navbar";
import { useMeetContext } from "../context/MeetContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { socket } from "../socket";
import { debounce } from "lodash";
import * as monaco from "monaco-editor";

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FFDD33"];

const CodeEditor = () => {
  const { darkMode, selectedLanguage, code, setCode, setMeetingId, setPassword } = useMeetContext();
  const { userId, username } = useContext(AuthContext);
  const location = useLocation();
  const { meetingId, password } = location.state || {};
  
  const [editorInstance, setEditorInstance] = useState(null);
  const cursorsRef = useRef({});
  const decorationsRef = useRef([]);
  const [cursorColors, setCursorColors] = useState({});
  const [usernames, setUsernames] = useState({});
  const monacoInstance = useMonaco();

  useEffect(() => {
    if (meetingId) setMeetingId(meetingId);
    if (password) setPassword(password);
  }, [meetingId, password, setMeetingId, setPassword]);

  useEffect(() => {
    if (meetingId && userId) {
      socket.emit("join-room", { roomId: meetingId, userId, username });

      socket.on("code-update", ({ id, code: updatedCode }) => {
        if (id !== userId) setCode(updatedCode);
      });

      socket.on("cursor-move", ({ id, position, name }) => {
        if (id !== userId) {
          cursorsRef.current[id] = { position, name };

          setCursorColors((prev) => {
            if (!prev[id]) {
              const color = COLORS[Object.keys(prev).length % COLORS.length];
              return { ...prev, [id]: color };
            }
            return prev;
          });

          setUsernames((prev) => ({ ...prev, [id]: name }));
          updateCursors();
        }
      });
    }

    return () => {
      socket.emit("leave-room");
      socket.off("code-update");
      socket.off("cursor-move");
    };
  }, [meetingId, userId, username, setCode]);

  const emitCodeChange = useCallback(
    debounce((newCode) => {
      socket.emit("code-change", { roomId: meetingId, userId, code: newCode });
    }, 500),
    [meetingId, userId]
  );

  const handleEditorDidMount = (editor) => {
    setEditorInstance(editor);

    editor.onDidChangeCursorPosition((event) => {
      const position = event.position;
      socket.emit("cursor-move", { roomId: meetingId, userId, position, name: username });
    });
  };

  const updateCursors = () => {
    if (!editorInstance || !monacoInstance) return;

    const newDecorations = Object.entries(cursorsRef.current).map(([id, { position, name }]) => ({
      range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
      options: {
        className: "custom-cursor",
        inlineClassName: `cursor-${id}`,
        afterContentClassName: `username-${id}`,
      },
    }));

    decorationsRef.current = editorInstance.deltaDecorations(decorationsRef.current, newDecorations);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Editor
        defaultLanguage={selectedLanguage}
        theme={darkMode ? "vs-dark" : "vs-light"}
        value={code}
        onChange={(value) => {
          setCode(value || "");
          emitCodeChange(value || "");
        }}
        onMount={handleEditorDidMount}
        options={{ automaticLayout: true }}
      />
      <style>
        {Object.entries(cursorColors)
          .map(([id, color]) => `
          .cursor-${id} { border-left: 2px solid ${color} !important; height: 1em; margin-left: -1px; }
          .username-${id}::after {
            content: '${usernames[id] || ""}';
            position: absolute;
            background: ${color};
            color: white;
            padding: 2px 6px;
            font-size: 12px;
            border-radius: 4px;
            top: -20px;
            left: 5px;
            white-space: nowrap;
          }
        `)
          .join("\n")}
      </style>
    </Box>
  );
};

export default CodeEditor;
