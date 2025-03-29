import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  Switch,
  FormControlLabel,
  CircularProgress,
  IconButton,
  InputAdornment
} from "@mui/material";
import {
  ArrowForward,
  Group,
  MeetingRoom,
  Close,
  Logout,
} from "@mui/icons-material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMeetContext } from "../context/MeetContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { socket } from "../socket";
import api from "../utils/api";

const MeetingPage = () => {
  const navigate = useNavigate();
  const {
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
    setUsers,
    showCreateForm,
    setShowCreateForm,
    loadingCreate,
    setLoadingCreate,
    loadingJoin,
    setLoadingJoin,
    darkMode,
  } = useMeetContext();
  const { userId, username, setLoggedIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("user-joined", ({ id, username }) => {
      setUsers((prevUsers) => [...prevUsers, { id, username }]);
    });

    return () => {
      socket.off("user-joined");
    };
  }, [setUsers]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#f4f4f4",
        color: darkMode ? "white" : "black",
        position: "relative",
        p: 2,
        transition: "background-color 0.3s ease, color 0.3s ease",
        "@media (max-width:600px)": {
          p: 1,
        },
      }}
    >
      {/* Top Right Controls */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          gap: 1,
          "@media (max-width:600px)": {
            top: 10,
            right: 10,
            gap: 0.5,
          },
        }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: darkMode ? "#333" : "black",
              color: "white",
              textTransform: "none",
              "@media (max-width:600px)": {
                fontSize: "0.9rem", // Adjust font size for small screens
              },
            }}
            startIcon={<Group />}
            onClick={() => setShowCreateForm(true)}
          >
            Create Meeting
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            sx={{
              bgcolor: darkMode ? "#444" : "black",
              color: "white",
              "&:hover": { bgcolor: darkMode ? "#555" : "#333" },
              "@media (max-width:600px)": {
                padding: 1, // Adjust padding for mobile screens
              },
            }}
            onClick={handleLogout}
          >
            <Logout />
          </IconButton>
        </motion.div>
      </Box>

      {/* Create Meeting Dialog */}
      {showCreateForm && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: 400 }, // Responsive width
            p: 4,
            borderRadius: 2,
            bgcolor: darkMode ? "#222" : "white",
            color: darkMode ? "white" : "black",
            boxShadow: 3,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Create Meeting
          </Typography>
          <TextField
            fullWidth
            label="Meeting Name"
            variant="outlined"
            margin="dense"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            sx={{
              bgcolor: darkMode ? "#333" : "white",
              borderRadius: 1,
              "@media (max-width:600px)": {
                fontSize: "0.9rem", // Adjust font size for mobile
              },
            }}
          />
          <FormControlLabel
            control={<Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />}
            label="Private Meeting"
          />
          {isPrivate && (
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                bgcolor: darkMode ? "#333" : "white",
                borderRadius: 1,
                "@media (max-width:600px)": {
                  fontSize: "0.9rem", // Adjust font size for mobile
                },
              }}
            />
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: darkMode ? "#444" : "black",
                color: "white",
                textTransform: "none",
                "@media (max-width:600px)": {
                  fontSize: "0.9rem", // Adjust font size for mobile
                },
              }}
              onClick={handleCreateMeeting}
              disabled={loadingCreate}
            >
              {loadingCreate ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Confirm"}
            </Button>
          </motion.div>
          <Button
            sx={{
              mt: 2,
              color: darkMode ? "#bbb" : "black",
              "@media (max-width:600px)": {
                fontSize: "0.9rem", // Adjust font size for mobile
              },
            }}
            startIcon={<Close />}
            onClick={() => setShowCreateForm(false)}
          >
            Cancel
          </Button>
        </Box>
      )}

      {/* Join Meeting Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box
          sx={{
            width: { xs: "80%", sm: 400 }, // Responsive width
            p: 4,
            borderRadius: 2,
            bgcolor: darkMode ? "#1e1e1e" : "white",
            boxShadow: 3,
            textAlign: "center",
            "@media (max-width:600px)": {
              p: 2, // Padding adjustments for mobile screens
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold" color={darkMode ? "white" : "black"}>
            <MeetingRoom sx={{ fontSize: 30, verticalAlign: "middle", mr: 1 }} />
            Join your meeting
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <TextField
            fullWidth
            label="Meeting ID"
            variant="outlined"
            margin="dense"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            sx={{
              bgcolor: darkMode ? "#333" : "white",
              borderRadius: 1,
              "@media (max-width:600px)": {
                fontSize: "0.9rem", // Adjust font size for mobile
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              bgcolor: darkMode ? "#333" : "white",
              borderRadius: 1,
              "@media (max-width:600px)": {
                fontSize: "0.9rem",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: darkMode ? "#444" : "black",
                color: "white",
                textTransform: "none",
                "@media (max-width:600px)": {
                  fontSize: "0.9rem", // Adjust font size for mobile
                },
              }}
              endIcon={<ArrowForward />}
              onClick={handleJoinMeeting}
              disabled={loadingJoin}
            >
              {loadingJoin ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Next"}
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default MeetingPage;
