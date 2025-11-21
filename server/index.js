require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));

const judgeRoutes = require("./routes/judge");
app.use("/api/judge", judgeRoutes);

const server = http.createServer(app);

app.use("/api/leetcode", require("./routes/leetcode"));


const leetcodeRoutes = require("./routes/leetcode");
app.use("/api/leetcode", leetcodeRoutes);


// Socket.io initialization
const { initSockets } = require("./sockets");
initSockets(server);

mongoose
  // .connect(process.env.MONGO_URI)
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => console.log("Server running on PORT " + PORT));
  })
  .catch((err) => console.error(err));
