import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem } from "@mui/material";
import { DarkMode, LightMode, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useMeetContext } from "../context/MeetContext";

const NavbarHome = () => {
  const { darkMode, toggleDarkMode } = useMeetContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [elevate, setElevate] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      setElevate(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: darkMode ? "black" : "white",
        color: darkMode ? "white" : "black",
        transition: "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: elevate ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            component="img"
            src="/logocodelive.png"
            alt="CodeLive Logo"
            sx={{ height: 34 }}
          />
        </Toolbar>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            component={Link}
            to="/signup"
            sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}
          >
            Login
          </Button>
          <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? "white" : "black" }}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={handleMenuOpen} sx={{ color: darkMode ? "white" : "black" }}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose} component={Link} to="/signup">
              Sign Up
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/login">
              Login
            </MenuItem>
            <MenuItem onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarHome;
