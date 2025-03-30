import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMeetContext } from "../context/MeetContext";
import NavbarHome from "./NavbarHome";

const LandingPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useMeetContext();

  return (
    <Box sx={{ m: 0, p: 0 }}>
      <NavbarHome darkMode={darkMode} />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: darkMode ? "#121212" : "white",
          color: darkMode ? "white" : "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Share Code in Real-time with Developers
        </Typography>
        <Typography variant="body1" color="gray" mt={1} mb={3}>
          An online code editor for interviews, troubleshooting, teaching & more...
        </Typography>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: darkMode ? "#444" : "black",
              color: "white",
              px: 3,
              py: 1,
              fontSize: "1rem",
              textTransform: "none",
            }}
            onClick={() => navigate("/login")}
          >
            Share Code Now
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LandingPage;
