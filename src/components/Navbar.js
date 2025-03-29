import React, { useState, useRef } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { DarkMode, LightMode, ContentCopy, Close, ArrowDropDown, Menu as MenuIcon } from "@mui/icons-material";
import { useMeetContext } from "../context/MeetContext";

const languages = [
  "javascript", "python", "java", "cpp", "c", "csharp", "php", "ruby", "swift", "go",
  "rust", "kotlin", "typescript", "scala", "perl", "haskell", "lua", "dart", "r"
];

const Navbar = () => {
  const {
    darkMode,
    toggleDarkMode,
    selectedLanguage,
    setSelectedLanguage,
    code,
    meetingId,
    password,
  } = useMeetContext();

  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [langAnchor, setLangAnchor] = useState(null);
  const urlRef = useRef(null);

  const inviteURL = `http://localhost:3000/joinroom?meetId=${meetingId}&password=${password}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteURL);
    if (urlRef.current) {
      urlRef.current.select();
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `code.${selectedLanguage}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLangAnchor(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: darkMode ? "black" : "white",
          color: darkMode ? "white" : "black",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        }}
      >

        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">CodeLive</Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button sx={{ color: darkMode ? "white" : "black", textTransform: "none" }} onClick={handleDownload}>Download</Button>
            <Button onClick={() => setOpen(true)} sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}>Invite</Button>
            <Button sx={{ color: darkMode ? "white" : "black", textTransform: "none" }} onClick={(e) => setLangAnchor(e.currentTarget)} endIcon={<ArrowDropDown />}>
              {selectedLanguage ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1).toLowerCase() : "Java"}
            </Button>
            <Menu anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={() => setLangAnchor(null)}>
              {languages.map((lang) => (
                <MenuItem key={lang} onClick={() => handleLanguageChange(lang)}>{lang.toUpperCase()}</MenuItem>
              ))}
            </Menu>
            <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? "white" : "black" }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: darkMode ? "white" : "black" }}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
              <MenuItem onClick={handleDownload}>Download</MenuItem>
              <MenuItem onClick={() => setOpen(true)}>Invite</MenuItem>
              <MenuItem onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Share Meeting Link
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">Invite others by sharing this link:</Typography>
          <TextField fullWidth variant="outlined" value={inviteURL} inputRef={urlRef} margin="dense" />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCopy} startIcon={<ContentCopy />}>Copy Link</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
