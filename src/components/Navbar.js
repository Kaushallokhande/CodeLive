import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  ContentCopy,
  Close,
  ArrowDropDown,
  Menu as MenuIcon
} from "@mui/icons-material";
import { useMeetContext } from "../context/MeetContext";

const languages = [
  "javascript", "typescript", "python", "java", "csharp", "cpp", "html", "css", "json", "php", "ruby", "scss", "less", "markdown", "xml", "powershell", "r", "sass", "coffeescript", "vb", "lua", "fsharp", "batch", "handlebars", "pug", "razor", "diff", "objective-c"
];


const languageFileExtensions = {
  typescript: "ts",
  javascript: "js",
  css: "css",
  less: "less",
  scss: "scss",
  json: "json",
  html: "html",
  xml: "xml",
  php: "php",
  csharp: "cs",
  cpp: "cpp",
  razor: "cshtml",
  markdown: "md",
  diff: "diff",
  java: "java",
  vb: "vb",
  coffeescript: "coffee",
  handlebars: "hbs",
  batch: "bat",
  pug: "pug",
  fsharp: "fs",
  lua: "lua",
  powershell: "ps1",
  python: "py",
  ruby: "rb",
  sass: "sass",
  r: "r",
  "objective-c": "m"
};



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
  const [mobileLangAnchor, setMobileLangAnchor] = useState(null);
  const urlRef = useRef(null);

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const extension = languageFileExtensions[selectedLanguage] || "txt";
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLangAnchor(null);
    setMobileLangAnchor(null);
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
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Box
                component="img"
                src="/logocodelive.png"
                alt="CodeLive Logo"
                sx={{ height: 34, cursor: "pointer" }}
              />
            </Link>
          </Toolbar>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button sx={{ color: darkMode ? "white" : "black", textTransform: "none" }} onClick={handleDownload}>Download</Button>
            <Button onClick={() => setOpen(true)} sx={{ color: darkMode ? "white" : "black", textTransform: "none" }}>Invite</Button>
            <Button sx={{ color: darkMode ? "white" : "black", textTransform: "none" }} onClick={(e) => setLangAnchor(e.currentTarget)} endIcon={<ArrowDropDown />}>
              {selectedLanguage ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1).toLowerCase() : "Java"}
            </Button>
            <Menu
              anchorEl={langAnchor}
              open={Boolean(langAnchor)}
              onClose={() => setLangAnchor(null)}
              PaperProps={{
                sx: {
                  bgcolor: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                },
              }}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  sx={{
                    color: darkMode ? "#fff" : "#000",
                    "&:hover": {
                      bgcolor: darkMode ? "#333" : "#f0f0f0",
                    },
                  }}
                >
                  {lang.toUpperCase()}
                </MenuItem>
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
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              PaperProps={{
                sx: {
                  bgcolor: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                },
              }}
            >
              <MenuItem
                onClick={handleDownload}
                sx={{
                  color: darkMode ? "#fff" : "#000",
                  "&:hover": {
                    bgcolor: darkMode ? "#333" : "#f0f0f0",
                  },
                }}
              >
                Download
              </MenuItem>
              <MenuItem
                onClick={() => setOpen(true)}
                sx={{
                  color: darkMode ? "#fff" : "#000",
                  "&:hover": {
                    bgcolor: darkMode ? "#333" : "#f0f0f0",
                  },
                }}
              >
                Invite
              </MenuItem>
              <MenuItem
                onClick={toggleDarkMode}
                sx={{
                  color: darkMode ? "#fff" : "#000",
                  "&:hover": {
                    bgcolor: darkMode ? "#333" : "#f0f0f0",
                  },
                }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </MenuItem>
              <MenuItem
                onClick={(e) => setMobileLangAnchor(e.currentTarget)}
                sx={{
                  color: darkMode ? "#fff" : "#000",
                  "&:hover": {
                    bgcolor: darkMode ? "#333" : "#f0f0f0",
                  },
                }}
              >
                Change Language
              </MenuItem>
            </Menu>

            <Menu
              anchorEl={mobileLangAnchor}
              open={Boolean(mobileLangAnchor)}
              onClose={() => setMobileLangAnchor(null)}
              PaperProps={{
                sx: {
                  bgcolor: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                },
              }}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  sx={{
                    color: darkMode ? "#fff" : "#000",
                    "&:hover": {
                      bgcolor: darkMode ? "#333" : "#f0f0f0",
                    },
                  }}
                >
                  {lang.toUpperCase()}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: darkMode ? "#1e1e1e" : "#fff",
            color: darkMode ? "#fff" : "#000"
          }
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: darkMode ? "#fff" : "#000"
          }}
        >
          Share Meeting Info
          <IconButton onClick={() => setOpen(false)} sx={{ color: darkMode ? "#fff" : "#000" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            sx={{ color: darkMode ? "rgba(255,255,255,0.7)" : "text.secondary" }}
            gutterBottom
          >
            Share the meeting details with your friends:
          </Typography>

          <TextField
            fullWidth
            label="Meeting ID"
            variant="outlined"
            value={meetingId}
            inputRef={urlRef}
            margin="dense"
            InputProps={{
              sx: {
                bgcolor: darkMode ? "#333" : "#fff",
                color: darkMode ? "#fff" : "#000",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#777" : undefined
                }
              },
              endAdornment: (
                <IconButton onClick={() => navigator.clipboard.writeText(meetingId)} sx={{ color: darkMode ? "#fff" : "#000" }}>
                  <ContentCopy />
                </IconButton>
              )
            }}
            InputLabelProps={{
              sx: { color: darkMode ? "#aaa" : undefined }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            value={password}
            margin="dense"
            InputProps={{
              sx: {
                bgcolor: darkMode ? "#333" : "#fff",
                color: darkMode ? "#fff" : "#000",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#777" : undefined
                }
              },
              endAdornment: (
                <IconButton onClick={() => navigator.clipboard.writeText(password)} sx={{ color: darkMode ? "#fff" : "#000" }}>
                  <ContentCopy />
                </IconButton>
              )
            }}
            InputLabelProps={{
              sx: { color: darkMode ? "#aaa" : undefined }
            }}
          />
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Navbar;
