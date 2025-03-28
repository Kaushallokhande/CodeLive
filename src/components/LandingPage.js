import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHome";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <NavbarHome />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "white",
          color: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
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
              bgcolor: "black",
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
