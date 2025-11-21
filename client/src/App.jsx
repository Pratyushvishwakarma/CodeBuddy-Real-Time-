// import { useState, useEffect } from "react";
// import { connectSocket } from "./socket";
// import Room from "./Room";
// import "./index.css";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [socket, setSocket] = useState(null);
//   const [roomId, setRoomId] = useState(null);

//   const [mode, setMode] = useState("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [joinId, setJoinId] = useState("");

//   useEffect(() => {
//     if (token && !socket) {
//       const s = connectSocket(token);
//       setSocket(s);
//     }
//   }, [token]);

//   async function handleRegister() {
//     setLoading(true);

//     const res = await fetch("http://localhost:4000/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.error) return alert(data.error);

//     localStorage.setItem("token", data.token);
//     setToken(data.token);
//   }

//   async function handleLogin() {
//     setLoading(true);

//     const res = await fetch("http://localhost:4000/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.error) return alert(data.error);

//     localStorage.setItem("token", data.token);
//     setToken(data.token);
//   }

//   // ==========================
//   // AUTH UI
//   // ==========================
//   if (!token) {
//     return (
//       <div className="auth-container">
//         <h2>{mode === "login" ? "Login" : "Register"}</h2>

//         {mode === "register" && (
//           <input
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input-box"
//           />
//         )}

//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input-box"
//         />

//         <input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input-box"
//         />

//         <button
//           onClick={mode === "login" ? handleLogin : handleRegister}
//           disabled={loading}
//           className="btn-primary"
//         >
//           {loading
//             ? "Loading..."
//             : mode === "login"
//             ? "Login"
//             : "Register"}
//         </button>

//         <p className="toggle-text">
//           {mode === "login" ? (
//             <>
//               No account?{" "}
//               <span onClick={() => setMode("register")}>Register</span>
//             </>
//           ) : (
//             <>
//               Already have an account?{" "}
//               <span onClick={() => setMode("login")}>Login</span>
//             </>
//           )}
//         </p>
//       </div>
//     );
//   }

//   // ==========================
//   // LOBBY PAGE
//   // ==========================
//   if (!roomId) {
//     return (
//       <div className="lobby-container">
//         <h2>Lobby</h2>

//         <button
//           className="btn-primary"
//           onClick={() => {
//             socket.emit("lobby:create_room", (res) => {
//               if (res.ok) setRoomId(res.roomId);
//               else alert(res.error);
//             });
//           }}
//         >
//           Create Room
//         </button>

//         <h3>Join Room</h3>

//         <input
//           placeholder="Room ID"
//           value={joinId}
//           onChange={(e) => setJoinId(e.target.value)}
//           className="input-box"
//         />

//         <button
//           className="btn-secondary"
//           onClick={() => {
//             socket.emit("lobby:join_room", { roomId: joinId }, (res) => {
//               if (!res.ok) alert(res.error);
//               else setRoomId(joinId);
//             });
//           }}
//         >
//           Join
//         </button>
//       </div>
//     );
//   }

//   // ==========================
//   // ROOM PAGE
//   // ==========================
//   return <Room socket={socket} roomId={roomId} />;
// }

// export default App;



// import { useState, useEffect } from "react";
// import { connectSocket } from "./socket";
// import Room from "./Room";
// import "./index.css";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [socket, setSocket] = useState(null);
//   const [roomId, setRoomId] = useState(null);

//   const [mode, setMode] = useState("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [joinId, setJoinId] = useState("");

//   // ---------------------------
//   // FIX: ENSURE SOCKET IS MADE ONLY ONCE
//   // ---------------------------
//   useEffect(() => {
//     if (token && !socket) {
//       const s = connectSocket(token);
//       console.log("🔥 SOCKET CREATED:", s);

//       window.__socket = s;  // for debugging
//       setSocket(s);
//     }
//   }, [token]);

//   // ---------------------------
//   // REGISTER
//   // ---------------------------
//   async function handleRegister() {
//     setLoading(true);

//     const res = await fetch("http://localhost:4000/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password })
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.error) return alert(data.error);

//     localStorage.setItem("token", data.token);
//     setToken(data.token);
//   }

//   // ---------------------------
//   // LOGIN
//   // ---------------------------
//   async function handleLogin() {
//     setLoading(true);

//     const res = await fetch("http://localhost:4000/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.error) return alert(data.error);

//     localStorage.setItem("token", data.token);
//     setToken(data.token);
//   }

//   // ---------------------------
//   // AUTH PAGE
//   // ---------------------------
//   if (!token) {
//     return (
//       <div className="auth-container">
//         <h2>{mode === "login" ? "Login" : "Register"}</h2>

//         {mode === "register" && (
//           <input
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input-box"
//           />
//         )}

//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input-box"
//         />

//         <input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input-box"
//         />

//         <button
//           onClick={mode === "login" ? handleLogin : handleRegister}
//           disabled={loading}
//           className="btn-primary"
//         >
//           {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
//         </button>

//         <p className="toggle-text">
//           {mode === "login" ? (
//             <>
//               No account?{" "}
//               <span onClick={() => setMode("register")}>Register</span>
//             </>
//           ) : (
//             <>
//               Already have an account?{" "}
//               <span onClick={() => setMode("login")}>Login</span>
//             </>
//           )}
//         </p>
//       </div>
//     );
//   }

//   // ---------------------------
//   // LOBBY PAGE
//   // ---------------------------
//   if (!roomId) {
//     return (
//       <div className="lobby-container">
//         <h2>Lobby</h2>

//         <button
//           className="btn-primary"
//           onClick={() => {
//             socket.emit("lobby:create_room", (res) => {
//               console.log("create_room response:", res);
//               if (res.ok) setRoomId(res.roomId);
//               else alert(res.error);
//             });
//           }}
//         >
//           Create Room
//         </button>

//         <h3>Join Room</h3>

//         <input
//           placeholder="Room ID"
//           value={joinId}
//           onChange={(e) => setJoinId(e.target.value)}
//           className="input-box"
//         />

//         <button
//           className="btn-secondary"
//           onClick={() => {
//             socket.emit("lobby:join_room", { roomId: joinId }, (res) => {
//               if (!res.ok) alert(res.error);
//               else setRoomId(joinId);
//             });
//           }}
//         >
//           Join
//         </button>
//       </div>
//     );
//   }

//   // ---------------------------
//   // ROOM PAGE
//   // ---------------------------
//   return <Room socket={socket} roomId={roomId} />;
// }

// export default App;




import { useState, useEffect } from "react";
import { connectSocket } from "./socket";
import Room from "./Room";
import "./index.css";
import "./App.css";
// import "./room.css";
// import ".auth.css"
import "./styles/auth.css";
// import "./styles/lobby.css";
// import ".styles/room.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [joinId, setJoinId] = useState("");

  // ------------------------------------------------------------
  // FINAL FIXED SOCKET INITIALIZER
  // ------------------------------------------------------------
  useEffect(() => {
    if (!token) return;

    console.log("🔥 Creating NEW socket…");

    const s = connectSocket(token);

    s.on("connect", () => {
      console.log("🔥 SOCKET CONNECTED WITH ID:", s.id);
    });

    window.__socket = s;
    setSocket(s);

    return () => {
      console.log("❌ Cleaning socket:", s.id);
      s.disconnect();
    };
  }, [token]);  // ⬅ ONLY token here

  // ------------------------------------------------------------
  // REGISTER
  // ------------------------------------------------------------
  async function handleRegister() {
    setLoading(true);

    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });


    const data = await res.json();
    setLoading(false);

    if (data.error) return alert(data.error);

    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  // ------------------------------------------------------------
  // LOGIN
  // ------------------------------------------------------------
  async function handleLogin() {
    setLoading(true);

    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) return alert(data.error);

    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  // ------------------------------------------------------------
  // AUTH PAGE
  // ------------------------------------------------------------
  if (!token) {
    return (
      <div className="auth-container">
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        {mode === "register" && (
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-box"
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
        />

        <button
          onClick={mode === "login" ? handleLogin : handleRegister}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
        </button>

        <p className="toggle-text">
          {mode === "login" ? (
            <>
              No account? <span onClick={() => setMode("register")}>Register</span>
            </>
          ) : (
            <>
              Already have an account? <span onClick={() => setMode("login")}>Login</span>
            </>
          )}
        </p>
      </div>
    );
  }

  // ------------------------------------------------------------
  // WAIT FOR SOCKET TO CONNECT FULLY
  // ------------------------------------------------------------
  if (!socket) {
    return <div style={{ textAlign: "center", marginTop: 50 }}>Connecting...</div>;
  }

  // ------------------------------------------------------------
  // LOBBY PAGE
  // ------------------------------------------------------------
  if (!roomId) {
    return (
      <div className="lobby-container">
        <h2>Lobby</h2>

        <button
          className="btn-primary"
          onClick={() => {
            // socket.emit("lobby:create_room", (res) => {
            //   console.log("Create room response:", res);
            //   if (res.ok) setRoomId(res.roomId);
            //   else alert(res.error);
            // });

            socket.emit("lobby:create_room", (res) => {
  console.log("Create room response:", res);
  if (res.ok) {
    socket.lastCreatedRoom = res.roomId;   // ⭐ VERY IMPORTANT
    setRoomId(res.roomId);
  } else {
    alert(res.error);
  }
});

          }}
        >
          Create Room
        </button>

        <h3>Join Room</h3>

        <input
          placeholder="Room ID"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
          className="input-box"
        />

        <button
          className="btn-secondary"
          onClick={() => {
            socket.emit("lobby:join_room", { roomId: joinId }, (res) => {
              if (!res.ok) alert(res.error);
              else setRoomId(joinId);
            });
          }}
        >
          Join
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------
  // ROOM PAGE
  // ------------------------------------------------------------
  return <Room socket={socket} roomId={roomId} />;
}

export default App;
