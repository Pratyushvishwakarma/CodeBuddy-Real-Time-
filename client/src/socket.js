import { io } from "socket.io-client";

export function connectSocket(token) {
  return io("http://localhost:4000", {
    auth: { token },
  });
}



