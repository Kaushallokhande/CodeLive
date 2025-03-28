import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Box, Alert, Switch, FormControlLabel, CircularProgress } from "@mui/material";
import { ArrowForward, Group, MeetingRoom, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const socket = io("https://codelive-backend.onrender.com"); // Update with your backend URL

const MeetingPage = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    socket.on("user-joined", ({ id, username }) => {
      setUsers((prevUsers) => [...prevUsers, { id, username }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCreateMeeting = async () => {
    try {
      setLoadingCreate(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://codelive-backend.onrender.com/api/rooms/",
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
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://codelive-backend.onrender.com/api/rooms/join",
        { roomId: meetingId, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
console.log(response.data);

      setSuccess("Joined meeting successfully!");
      socket.emit("join-room", { roomId: meetingId, userId: "1234", username: "John Doe" });

      navigate("/code", { state: { meetingId, password } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join meeting");
    } finally {
      setLoadingJoin(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", bgcolor: "white", position: "relative" }}>
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="contained" sx={{ bgcolor: "black", color: "white", textTransform: "none" }} startIcon={<Group />} onClick={() => setShowCreateForm(true)}>
            Create Meeting
          </Button>
        </motion.div>
      </Box>

      {/* Create Meeting Form */}
      {showCreateForm && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, p: 4, borderRadius: 2, bgcolor: "white", boxShadow: 3, textAlign: "center", zIndex: 10 }}>
          <Typography variant="h6" fontWeight="bold" color="black">Create Meeting</Typography>

          <TextField fullWidth label="Meeting Name" variant="outlined" margin="dense" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} />

          <FormControlLabel control={<Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />} label="Private Meeting" />

          {isPrivate && <TextField fullWidth label="Password" type="password" variant="outlined" margin="dense" value={password} onChange={(e) => setPassword(e.target.value)} />}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "black", color: "white", textTransform: "none" }} onClick={handleCreateMeeting} disabled={loadingCreate}>
              {loadingCreate ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Confirm"}
            </Button>
          </motion.div>

          <Button sx={{ mt: 2 }} startIcon={<Close />} onClick={() => setShowCreateForm(false)}>Cancel</Button>
        </Box>
      )}

      {/* Join Meeting Form */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ width: 400, p: 4, borderRadius: 2, bgcolor: "white", boxShadow: 3, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" color="black">
            <MeetingRoom sx={{ fontSize: 30, verticalAlign: "middle", mr: 1 }} />
            Join your meeting
          </Typography>
          <Typography variant="body2" color="gray" mb={2}>Enter the Meeting ID and Password to join</Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField fullWidth label="Meeting ID" variant="outlined" margin="dense" value={meetingId} onChange={(e) => setMeetingId(e.target.value)} />
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="dense" value={password} onChange={(e) => setPassword(e.target.value)} />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "black", color: "white", textTransform: "none" }} endIcon={<ArrowForward />} onClick={handleJoinMeeting} disabled={loadingJoin}>
              {loadingJoin ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Next"}
            </Button>
          </motion.div>

          {/* Show connected users */}
          {users.length > 0 && (
            <Box mt={2}>
              <Typography variant="body2" fontWeight="bold">Users in Meeting:</Typography>
              {users.map((user) => (
                <Typography key={user.id} variant="body2">{user.username} joined</Typography>
              ))}
            </Box>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default MeetingPage;
