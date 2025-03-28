import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Box, Divider, Alert } from "@mui/material";
import { GitHub, Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://codelive-backend.onrender.com/api/auth/signup", {
        username,
        email,
        password,
      });
      
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "black", color: "white", textTransform: "none" }}
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? `Creating Account${dots}` : "Create Account"}
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
