const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

function initSockets(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // JWT AUTH
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.user.email);

    // ===========================
    // CREATE ROOM
    // ===========================
   socket.on("lobby:create_room", (cb) => {
  const roomId = "room_" + Date.now();

  socket.join(roomId);
console.log("🔥 HOST ASSIGNED:", socket.user.email);
  // IMPORTANT: mark the first user as host
  socket.emit("room:host");

  cb({ ok: true, roomId });
});


    // ===========================
    // JOIN ROOM
    // ===========================
    socket.on("lobby:join_room", ({ roomId }, cb) => {
      const room = io.sockets.adapter.rooms.get(roomId);

      if (!room) {
        return cb({ ok: false, error: "Room does not exist" });
      }

      // If room exists and is empty (rare), assign host
      if (room.size === 0) {
        socket.join(roomId);
        socket.emit("room:host");
      } else {
        // Join room normally
        socket.join(roomId);
      }

      // Notify opponent
      socket.to(roomId).emit("room:joined", { user: socket.user });

      cb({ ok: true });
    });

    // ===========================
    // START DUEL (host triggers)
    // ===========================
    socket.on("room:start_duel", ({ roomId, question }) => {
      io.to(roomId).emit("room:start_duel", { question });
    });

    socket.on("room:next_question", ({ roomId, question }) => {
  io.to(roomId).emit("room:next_question", { question });
});



    // ===========================
    // WEBRTC SIGNALING
    // ===========================
    socket.on("webrtc:offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("webrtc:offer", { offer });
    });

    socket.on("webrtc:answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("webrtc:answer", { answer });
    });

    socket.on("webrtc:ice_candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("webrtc:ice_candidate", { candidate });
    });
  });
}

module.exports = { initSockets };
