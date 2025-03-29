import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://codelive-backend.onrender.com";

export const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  withCredentials: true,
});
