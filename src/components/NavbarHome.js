import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavbarHome = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: darkMode ? "black" : "white", color: darkMode ? "white" : "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          CodeShare
        </Typography>
        <Box>
          <Button component={Link} to="/signup" sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}>
            Sign Up
          </Button>
          <Button component={Link} to="/login" sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}>
            Login
          </Button>
          <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? "white" : "black" }}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarHome;
