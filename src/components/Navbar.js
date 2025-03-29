import React, { useState, useRef } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Dialog, DialogTitle, DialogContent, TextField, Menu, MenuItem } from "@mui/material";
import { DarkMode, LightMode, ContentCopy, Close, ArrowDropDown } from "@mui/icons-material";
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
    file,
    meetingId,
    password,
  } = useMeetContext();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const urlRef = useRef(null);

  const inviteURL = `http://localhost:3000/joinroom?meetId=${meetingId}&password=${password}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteURL);
    if (urlRef.current) {
      urlRef.current.select();
    }
  };

  const handleDownload = () => {
    const blob = new Blob([file], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `code.${selectedLanguage}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: darkMode ? "black" : "white", color: darkMode ? "white" : "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">CodeLive</Typography>
          <Box>
            <Button sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}>Save</Button>

            <Button sx={{ color: darkMode ? "white" : "black", textTransform: "none" }} onClick={handleDownload}>Download</Button>

            <Button onClick={() => setOpen(true)} sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}>Invite</Button>

            <Button sx={{ color: darkMode ? "white" : "black", textTransform: "none" }} onClick={(e) => setAnchorEl(e.currentTarget)} endIcon={<ArrowDropDown />}>
              {selectedLanguage ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1).toLowerCase() : "Java"}
            </Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              {languages.map((lang) => (
                <MenuItem key={lang} onClick={() => handleLanguageChange(lang)}>{lang.toUpperCase()}</MenuItem>
              ))}
            </Menu>
            <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? "white" : "black" }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
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
