import React, { useState, useEffect, useContext } from "react";
import { Button, TextField, Typography, Box, Divider, Alert } from "@mui/material";
import { GitHub, Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, loading, error, success } = useContext(AuthContext); // Get signup function from AuthContext
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dots, setDots] = useState("");

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

    await signup(username.trim(), email.trim(), password.trim()); // Use signup function from AuthContext
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 2,
          bgcolor: "white",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="black">
          Create an account
        </Typography>
        <Typography variant="body2" color="gray" mb={2}>
          Enter your details below to create an account
        </Typography>

        <Box display="flex" gap={2} justifyContent="center" mb={2}>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            sx={{ color: "black", borderColor: "black", textTransform: "none" }}
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            startIcon={<Google />}
            sx={{ color: "black", borderColor: "black", textTransform: "none" }}
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
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
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
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "black", color: "white", textTransform: "none" }}
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
