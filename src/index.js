import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { MeetProvider } from "./context/MeetContext"; // Import MeetProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <MeetProvider>
        <App />
      </MeetProvider>
    </AuthProvider>
  </BrowserRouter>
);
