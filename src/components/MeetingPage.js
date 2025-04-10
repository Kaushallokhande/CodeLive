import React, { useState, useContext, useEffect } from "react";
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
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useMeetContext } from "../context/MeetContext";
import { AuthContext } from "../context/AuthContext";

const MeetingPage = () => {
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
    showCreateForm,
    setShowCreateForm,
    loadingCreate,
    loadingJoin,
    darkMode,
    handleCreateMeeting,
    handleJoinMeeting
  } = useMeetContext();
  const { logout } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        if (error) setError("");
        if (success) setSuccess("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [error, success]);


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
              "&:hover": {
                bgcolor: darkMode ? "#444" : "#222",
              },
              "@media (max-width:600px)": {
                fontSize: "0.9rem",
                minWidth: "unset",
                px: 1.5,
              },
              borderRadius: 2,
              boxShadow: darkMode ? "0 2px 8px rgba(255,255,255,0.05)" : "0 2px 8px rgba(0,0,0,0.2)",
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
                padding: 1,
              },
            }}
            onClick={handleLogout}
          >
            <Logout />
          </IconButton>
        </motion.div>
      </Box>

      {/* Create Meeing Dialog */}
      {showCreateForm && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: 400 },
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
            InputLabelProps={{
              style: {
                color: darkMode ? "#ccc" : "#555",
              },
            }}
            InputProps={{
              style: {
                backgroundColor: darkMode ? "#2c2c2c" : "#fff",
                color: darkMode ? "#eee" : "#000",
                borderRadius: 8,
              },
            }}
            sx={{
              mt: 1,
              mb: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#555" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#888" : "#999",
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? "#bbb" : "black",
                },
              },
              "@media (max-width:600px)": {
                fontSize: "0.9rem",
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
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: {
                  color: darkMode ? "#ccc" : "#555",
                },
              }}
              InputProps={{
                style: {
                  backgroundColor: darkMode ? "#2c2c2c" : "#fff",
                  color: darkMode ? "#eee" : "#000",
                  borderRadius: 8,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        color: darkMode ? "#ccc" : "#555",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 1,
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "#555" : "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "#888" : "#999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#bbb" : "black",
                  },
                },
                "@media (max-width:600px)": {
                  fontSize: "0.9rem",
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
                  fontSize: "0.9rem",
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
                fontSize: "0.9rem",
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
            width: { xs: "80%", sm: 400 },
            p: 4,
            borderRadius: 2,
            bgcolor: darkMode ? "#1e1e1e" : "white",
            boxShadow: 3,
            textAlign: "center",
            "@media (max-width:600px)": {
              p: 2,
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
            InputLabelProps={{
              style: {
                color: darkMode ? "#ccc" : "#555",
              },
            }}
            InputProps={{
              style: {
                backgroundColor: darkMode ? "#2c2c2c" : "#fff",
                color: darkMode ? "#eee" : "#000",
                borderRadius: 8,
              },
            }}
            sx={{
              mt: 1,
              mb: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#555" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#888" : "#999",
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? "#bbb" : "black",
                },
              },
              "@media (max-width:600px)": {
                fontSize: "0.9rem",
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
            InputLabelProps={{
              style: {
                color: darkMode ? "#ccc" : "#555",
              },
            }}
            InputProps={{
              style: {
                backgroundColor: darkMode ? "#2c2c2c" : "#fff",
                color: darkMode ? "#eee" : "#000",
                borderRadius: 8,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{
                      color: darkMode ? "#ccc" : "#555",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>

              ),
            }}
            sx={{
              mt: 1,
              mb: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#555" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#888" : "#999",
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? "#bbb" : "black",
                },
              },
              "@media (max-width:600px)": {
                fontSize: "0.9rem",
              },
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
