import React, { useState, useEffect, useContext } from "react";
import { Button, TextField, Typography, Box, Divider, Alert } from "@mui/material";
import { GitHub, Google } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMeetContext } from "../context/MeetContext";

const SignupForm = () => {
  const { signup, loading, error, success } = useContext(AuthContext);
  const { darkMode } = useMeetContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dots, setDots] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      return;
    }
    await signup(username.trim(), email.trim(), password.trim());
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "white",
        color: darkMode ? "white" : "black",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          bgcolor: darkMode ? "#1e1e1e" : "white",
          boxShadow: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color={darkMode ? "white" : "black"}>
          Create an account
        </Typography>
        <Typography variant="body2" color="gray" mb={2}>
          Enter your details below to create an account
        </Typography>

        <Box display="flex" gap={2} justifyContent="center" mb={2}>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            sx={{
              color: darkMode ? "white" : "black",
              borderColor: darkMode ? "white" : "black",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: darkMode ? "black" : "black", color: "white" },
            }}
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            startIcon={<Google />}
            sx={{
              color: darkMode ? "white" : "black",
              borderColor: darkMode ? "white" : "black",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: darkMode ? "black" : "black", color: "white" },
            }}
          >
            Google
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>OR CONTINUE WITH</Divider>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="dense"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          sx={{ borderRadius: 2, bgcolor: darkMode ? "#333" : "white" }}
          InputProps={{ style: { color: darkMode ? "white" : "black" } }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          sx={{ borderRadius: 2, bgcolor: darkMode ? "#333" : "white" }}
          InputProps={{ style: { color: darkMode ? "white" : "black" } }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          sx={{ borderRadius: 2, bgcolor: darkMode ? "#333" : "white" }}
          InputProps={{ style: { color: darkMode ? "white" : "black" } }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: darkMode ? "#444" : "black",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { bgcolor: darkMode ? "gray" : "gray" },
          }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? `Creating Account${dots}` : "Create Account"}
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
