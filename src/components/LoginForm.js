import React, { useState, useEffect, useContext } from "react";
import { Button, TextField, Typography, Box, Divider, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMeetContext } from "../context/MeetContext";

const LoginForm = () => {
  const { login, loading, error } = useContext(AuthContext);
  const { darkMode } = useMeetContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async () => {
    if (!email.trim() || !password.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return;
    }
    await login(email.trim(), password.trim());
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#f5f5f5",
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: 5,
          bgcolor: darkMode ? "#1e1e1e" : "white",
        }}
      >
        <Box
          sx={{
            width: 400,
            display: { xs: "none", md: "block" },
            bgcolor: "#ccc",
          }}
        >
          <img
            src="/BGCodeLive.png"
            alt="Background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            width: 400,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            bgcolor: darkMode ? "#1e1e1e" : "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login to your account
          </Typography>
          <Typography variant="body2" color="gray" mb={2}>
            Enter your credentials to access your account
          </Typography>

          <Divider sx={{ my: 2 }}>OR CONTINUE WITH</Divider>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={loading}
            sx={{ bgcolor: darkMode ? "#333" : "white" }}
            InputProps={{ style: { color: darkMode ? "white" : "black" } }}
            error={email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
            helperText={email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email" : ""}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
            sx={{ bgcolor: darkMode ? "#333" : "white" }}
            InputProps={{
              style: { color: darkMode ? "white" : "black" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? `Loading${dots}` : "Login"}
          </Button>

          <Typography variant="body2" mt={2} color="gray">
            Don't have an account?{" "}
            <Button
              sx={{
                textTransform: "none",
                color: darkMode ? "white" : "black",
                fontWeight: "bold",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;