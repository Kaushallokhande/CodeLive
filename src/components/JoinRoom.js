import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeetContext } from "../context/MeetContext";
import api from "../utils/api";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";

const JoinRoom = () => {
  const { setMeetingId, setPassword, handleInviteJoinMeeting } = useMeetContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const meetId = searchParams.get("meetId");
    const password = searchParams.get("password");

    if (!meetId) {
      alert("Invalid meeting link!");
      navigate("/");
      return;
    }

    const joinRoom = async () => {
      try {
        const response = await api.get(`/rooms/joinquery?meetId=${meetId}&password=${password}`);

        if (response.data.error) {
          alert(response.data.error);
          navigate("/");
          return;
        }

        const { id: fetchedMeetId } = response.data.room;

        setMeetingId(fetchedMeetId);
        setPassword(password);

        await handleInviteJoinMeeting(fetchedMeetId, password);
      } catch (error) {
        console.error("Error joining room:", error);
        alert("Failed to join room. Try again.");
        navigate("/");
      }
    };

    joinRoom();
  }, [searchParams, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="textPrimary">
          Joining Room...
        </Typography>
        <CircularProgress color="primary" />
      </Paper>
    </Box>
  );
};

export default JoinRoom;