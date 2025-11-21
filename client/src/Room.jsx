// import { useEffect, useRef, useState } from "react";
// import { Editor } from "@monaco-editor/react";
// import "./room.css";

// export default function Room({ socket, roomId }) {
//   const [remoteStream, setRemoteStream] = useState(null);
//   const peerRef = useRef(null);
//   const localStreamRef = useRef(null);

//   const [question, setQuestion] = useState(null);
//   const [isHost, setIsHost] = useState(false);
//   const [duelStarted, setDuelStarted] = useState(false);

//   // ===========================
//   // LANGUAGE SELECTOR STATE
//   // ===========================
//   const [language, setLanguage] = useState("javascript");

//   // Judge0 mapping
//   const JUDGE0_LANGUAGE_MAP = {
//     javascript: 63,
//     python: 71,
//     cpp: 54,
//     java: 62,
//   };

//   useEffect(() => {
//     // JOIN ROOM
//     socket.emit("lobby:join_room", { roomId }, (res) => {
//       if (!res.ok) alert("Could not join room");
//     });

//     // HOST EVENTconsole.log("Room mounted, socket =", socket);
// // HOST EVENT
// console.log("Room mounted, socket =", socket);

// socket.on("room:host", () => {
//   console.log("🔥 CLIENT RECEIVED HOST EVENT");
//   setIsHost(true);
// });

// socket.on("room:joined", (data) => {
//   console.log("Opponent joined:", data);
// });


//     // START DUEL EVENT
//     socket.on("room:start_duel", ({ question }) => {
//       setQuestion(question);
//       setDuelStarted(true);
//     });

//     // WEBRTC
//     socket.on("webrtc:offer", async ({ offer }) => {
//       await handleReceiveOffer(offer);
//     });

//     socket.on("webrtc:answer", async ({ answer }) => {
//       if (peerRef.current)
//         await peerRef.current.setRemoteDescription(answer);
//     });

//     socket.on("webrtc:ice_candidate", async ({ candidate }) => {
//       if (peerRef.current && candidate) {
//         await peerRef.current.addIceCandidate(candidate);
//       }
//     });
//   }, []);

//   // ===========================
//   // START DUEL (HOST)
//   // ===========================
//   function startDuel() {
//     const sampleQuestion = {
//       title: "Two Sum",
//       description:
//         "Given an array nums and a target, return the indices of the two numbers that add up to the target.",
//       example: "Input: nums=[2,7,11,15], target=9 → Output: [0,1]",
//       constraints: "1 <= nums.length <= 10^4",
//     };

//     socket.emit("room:start_duel", { roomId, question: sampleQuestion });
//   }

//   // ===========================
//   // AUDIO FUNCTIONS
//   // ===========================
//   async function joinAudio() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     pc.ontrack = (e) => {
//       setRemoteStream(e.streams[0]);
//     };

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", {
//           roomId,
//           candidate: e.candidate,
//         });
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     socket.emit("webrtc:offer", { roomId, offer });
//   }

//   async function handleReceiveOffer(offer) {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     pc.ontrack = (e) => setRemoteStream(e.streams[0]);

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", {
//           roomId,
//           candidate: e.candidate,
//         });
//     };

//     await pc.setRemoteDescription(offer);

//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     socket.emit("webrtc:answer", { roomId, answer });
//   }

//   // ===========================
//   // UI
//   // ===========================
//   return (
//     <div className="room-wrapper">
//       <h2>Room: {roomId}</h2>

//       {/* HOST → Start Button */}
//       {!duelStarted && isHost && (
//         <button className="btn-start" onClick={startDuel}>
//           Start Duel
//         </button>
//       )}

//       {/* QUESTION UI */}
//       {duelStarted && question && (
//         <div className="question-box">
//           <h3>{question.title}</h3>
//           <p>{question.description}</p>
//           <p><strong>Example:</strong> {question.example}</p>
//           <p><strong>Constraints:</strong> {question.constraints}</p>
//         </div>
//       )}

//       {/* AUDIO */}
//       <button className="btn-primary" onClick={joinAudio}>
//         Join Audio Call
//       </button>

//       {/* LANGUAGE SELECTOR */}
//       <div className="lang-select-box">
//         <label>Language: </label>
//         <select
//           className="lang-select"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>
//       </div>

//       {/* CODE EDITOR */}
//       <div className="editor-container">
//         <Editor
//   height="350px"
//   language={language}
//   value="// Start coding..."
//   onChange={() => {}}
// />

//       </div>

//       {/* OPPONENT AUDIO */}
//       <div className="audio-container">
//         <h3>Opponent Audio</h3>
//         {remoteStream ? (
//           <audio
//             autoPlay
//             controls
//             ref={(el) => el && (el.srcObject = remoteStream)}
//           />
//         ) : (
//           <p>Waiting for opponent...</p>
//         )}
//       </div>
//     </div>
//   );
// }
 




// import { useEffect, useRef, useState } from "react";
// import { Editor } from "@monaco-editor/react";
// import "./room.css";

// export default function Room({ socket, roomId }) {
//   const [remoteStream, setRemoteStream] = useState(null);
//   const peerRef = useRef(null);
//   const localStreamRef = useRef(null);

//   const [question, setQuestion] = useState(null);
//   const [isHost, setIsHost] = useState(false);
//   const [duelStarted, setDuelStarted] = useState(false);

//   const [language, setLanguage] = useState("javascript");

//   const JUDGE0_LANGUAGE_MAP = {
//     javascript: 63,
//     python: 71,
//     cpp: 54,
//     java: 62,
//   };

//   useEffect(() => {
//     console.log("🔥 Room mounted. socket =", socket, "roomId =", roomId);

//     // ---------------------------------------------------------------
//     // FIX: CREATOR SHOULD NOT JOIN ROOM AGAIN
//     // ---------------------------------------------------------------
//     if (socket.lastCreatedRoom === roomId) {
//       console.log("🟢 This user CREATED the room → Mark as host");
//       setIsHost(true);
//     } else {
//       console.log("🟠 This user JOINED the room → requesting join");
//       socket.emit("lobby:join_room", { roomId }, (res) => {
//         console.log("join_room callback:", res);
//         if (!res.ok) alert("Could not join room");
//       });
//     }

//     // HOST event from server
//     socket.on("room:host", () => {
//       console.log("🔥 CLIENT RECEIVED HOST EVENT");
//       setIsHost(true);
//     });

//     // Opponent joined
//     socket.on("room:joined", (data) => {
//       console.log("👥 Opponent joined:", data);
//     });

//     // Duel started
//     // socket.on("room:start_duel", ({ question }) => {
//     //   setQuestion(question);
//     //   setDuelStarted(true);
//     // });


//     socket.on("room:start_duel", ({ question }) => {
//   console.log("🔥 start_duel RECEIVED. Question =", question);
//   setQuestion(question);
//   setDuelStarted(true);
// });


//     // WEBRTC
//     socket.on("webrtc:offer", async ({ offer }) => {
//       await handleReceiveOffer(offer);
//     });

//     socket.on("webrtc:answer", async ({ answer }) => {
//       if (peerRef.current)
//         await peerRef.current.setRemoteDescription(answer);
//     });

//     socket.on("webrtc:ice_candidate", async ({ candidate }) => {
//       if (peerRef.current && candidate) {
//         await peerRef.current.addIceCandidate(candidate);
//       }
//     });
//   }, []);

//   // ----------------------------------------------------------------
//   // START DUEL (HOST ONLY)
//   // ----------------------------------------------------------------
//   function startDuel() {
//     const sampleQuestion = {
//       title: "Two Sum",
//       description:
//         "Given an array nums and a target, return the indices of the two numbers that add up to the target.",
//       example: "Input: nums=[2,7,11,15], target=9 → Output: [0,1]",
//       constraints: "1 <= nums.length <= 10^4",
//     };

//     socket.emit("room:start_duel", { roomId, question: sampleQuestion });
//   }

//   // ----------------------------------------------------------------
//   // AUDIO (WebRTC)
//   // ----------------------------------------------------------------
//   async function joinAudio() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     pc.ontrack = (e) => {
//       setRemoteStream(e.streams[0]);
//     };

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", {
//           roomId,
//           candidate: e.candidate,
//         });
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     socket.emit("webrtc:offer", { roomId, offer });
//   }

//   async function handleReceiveOffer(offer) {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     pc.ontrack = (e) => setRemoteStream(e.streams[0]);

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", {
//           roomId,
//           candidate: e.candidate,
//         });
//     };

//     await pc.setRemoteDescription(offer);

//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     socket.emit("webrtc:answer", { roomId, answer });
//   }

//   // ----------------------------------------------------------------
//   // UI
//   // ----------------------------------------------------------------
//   return (
//     <div className="room-wrapper">
//       <h2>Room: {roomId}</h2>

//       {/* HOST → Start Button */}
//       {!duelStarted && isHost && (
//         <button className="btn-start" onClick={startDuel}>
//           Start Duel
//         </button>
//       )}

//       {/* QUESTION UI */}
//       {duelStarted && question && (
//         <div className="question-box">
//           <h3>{question.title}</h3>
//           <p>{question.description}</p>
//           <p><strong>Example:</strong> {question.example}</p>
//           <p><strong>Constraints:</strong> {question.constraints}</p>
//         </div>
//       )}

//       {/* AUDIO */}
//       <button className="btn-primary" onClick={joinAudio}>
//         Join Audio Call
//       </button>

//       {/* LANGUAGE SELECTOR */}
//       <div className="lang-select-box">
//         <label>Language: </label>
//         <select
//           className="lang-select"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>
//       </div>

//       {/* CODE EDITOR */}
//       <div className="editor-container">
//         <Editor
//           height="350px"
//           language={language}
//           value="// Start coding..."
//           onChange={() => {}}
//         />
//       </div>

//       {/* OPPONENT AUDIO */}
//       <div className="audio-container">
//         <h3>Opponent Audio</h3>
//         {remoteStream ? (
//           <audio
//             autoPlay
//             controls
//             ref={(el) => el && (el.srcObject = remoteStream)}
//           />
//         ) : (
//           <p>Waiting for opponent...</p>
//         )}
//       </div>
//     </div>
//   );
// }





// import { useEffect, useRef, useState } from "react";
// import { Editor } from "@monaco-editor/react";
// import "./room.css";

// export default function Room({ socket, roomId }) {
//   const [remoteStream, setRemoteStream] = useState(null);
//   const peerRef = useRef(null);
//   const localStreamRef = useRef(null);

//   const [question, setQuestion] = useState(null);
//   const [isHost, setIsHost] = useState(false);
//   const [duelStarted, setDuelStarted] = useState(false);

//   const [language, setLanguage] = useState("javascript");

//   const JUDGE0_LANGUAGE_MAP = {
//     javascript: 63,
//     python: 71,
//     cpp: 54,
//     java: 62,
//   };

//   useEffect(() => {
//     if (!socket) return;

//     console.log("🔥 Room mounted. socket =", socket, "roomId =", roomId);

//     // ---- helper listeners ----
//     const onHost = () => {
//       console.log("🔥 CLIENT RECEIVED HOST EVENT");
//       setIsHost(true);
//     };

//     const onJoined = (data) => {
//       console.log("👥 Opponent joined:", data);
//     };

//     const onStart = ({ question }) => {
//       console.log("🔥 start_duel RECEIVED. Question =", question);
//       setQuestion(question);
//       setDuelStarted(true);
//     };

//     const onOffer = async ({ offer }) => {
//       try {
//         await handleReceiveOffer(offer);
//       } catch (err) {
//         console.error("Error handling offer:", err);
//       }
//     };

//     const onAnswer = async ({ answer }) => {
//       try {
//         if (peerRef.current) await peerRef.current.setRemoteDescription(answer);
//       } catch (err) {
//         console.error("Error applying answer:", err);
//       }
//     };

//     const onIce = async ({ candidate }) => {
//       try {
//         if (peerRef.current && candidate) await peerRef.current.addIceCandidate(candidate);
//       } catch (err) {
//         console.error("Error adding ice candidate:", err);
//       }
//     };

//     // Attach listeners FIRST so we don't miss any events
//     socket.on("room:host", onHost);
//     socket.on("room:joined", onJoined);
//     socket.on("room:start_duel", onStart);
//     socket.on("webrtc:offer", onOffer);
//     socket.on("webrtc:answer", onAnswer);
//     socket.on("webrtc:ice_candidate", onIce);

//     // If this socket created the room, mark as host.
//     // The App.jsx sets socket.lastCreatedRoom when creating a room.
//     if (socket.lastCreatedRoom === roomId) {
//       console.log("🟢 This user CREATED the room → Mark as host");
//       setIsHost(true);
//     } else {
//       // Otherwise, emit join AFTER listeners are attached.
//       console.log("🟠 This user JOINED the room → requesting join");
//       socket.emit("lobby:join_room", { roomId }, (res) => {
//         console.log("join_room callback:", res);
//         if (!res.ok) alert("Could not join room");
//       });
//     }

//     // cleanup on unmount / deps change
//     return () => {
//       socket.off("room:host", onHost);
//       socket.off("room:joined", onJoined);
//       socket.off("room:start_duel", onStart);
//       socket.off("webrtc:offer", onOffer);
//       socket.off("webrtc:answer", onAnswer);
//       socket.off("webrtc:ice_candidate", onIce);
//       // do not leave peer tracks hanging
//       if (peerRef.current) {
//         try {
//           peerRef.current.close();
//         } catch (e) {}
//         peerRef.current = null;
//       }
//     };
//     // run when socket or roomId changes
//   }, [socket, roomId]);

//   // ----------------------------------------------------------------
//   // START DUEL (HOST ONLY)
//   // ----------------------------------------------------------------
//   function startDuel() {
//     const sampleQuestion = {
//       title: "Two Sum",
//       description:
//         "Given an array nums and a target, return the indices of the two numbers that add up to the target.",
//       example: "Input: nums=[2,7,11,15], target=9 → Output: [0,1]",
//       constraints: "1 <= nums.length <= 10^4",
//     };

//     socket.emit("room:start_duel", { roomId, question: sampleQuestion });
//   }

//   // ----------------------------------------------------------------
//   // AUDIO (WebRTC)
//   // ----------------------------------------------------------------
//   async function joinAudio() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     pc.ontrack = (e) => {
//       setRemoteStream(e.streams[0]);
//     };

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", {
//           roomId,
//           candidate: e.candidate,
//         });
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     socket.emit("webrtc:offer", { roomId, offer });
//   }

//   async function handleReceiveOffer(offer) {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     pc.ontrack = (e) => setRemoteStream(e.streams[0]);

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", {
//           roomId,
//           candidate: e.candidate,
//         });
//     };

//     await pc.setRemoteDescription(offer);

//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     socket.emit("webrtc:answer", { roomId, answer });
//   }

//   // ----------------------------------------------------------------
//   // UI
//   // ----------------------------------------------------------------
//   return (
//     <div className="room-wrapper">
//       <h2>Room: {roomId}</h2>

//       {/* HOST → Start Button */}
//       {!duelStarted && isHost && (
//         <button className="btn-start" onClick={startDuel}>
//           Start Duel
//         </button>
//       )}

//       {/* QUESTION UI */}
//       {duelStarted && question && (
//         <div className="question-box">
//           <h3>{question.title}</h3>
//           <p>{question.description}</p>
//           <p>
//             <strong>Example:</strong> {question.example}
//           </p>
//           <p>
//             <strong>Constraints:</strong> {question.constraints}
//           </p>
//         </div>
//       )}

//       {/* AUDIO */}
//       <button className="btn-primary" onClick={joinAudio}>
//         Join Audio Call
//       </button>

//       {/* LANGUAGE SELECTOR */}
//       <div className="lang-select-box">
//         <label>Language: </label>
//         <select
//           className="lang-select"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>
//       </div>

//       {/* CODE EDITOR */}
//       <div className="editor-container">
//         <Editor height="350px" language={language} value={"// Start coding..."} onChange={() => {}} />
//       </div>

//       {/* OPPONENT AUDIO */}
//       <div className="audio-container">
//         <h3>Opponent Audio</h3>
//         {remoteStream ? (
//           <audio autoPlay controls ref={(el) => el && (el.srcObject = remoteStream)} />
//         ) : (
//           <p>Waiting for opponent...</p>
//         )}
//       </div>
//     </div>
//   );
// }






// import { useEffect, useRef, useState } from "react";
// import { Editor } from "@monaco-editor/react";
// import "./room.css";

// export default function Room({ socket, roomId }) {
//   const [remoteStream, setRemoteStream] = useState(null);
//   const peerRef = useRef(null);
//   const localStreamRef = useRef(null);

//   const [question, setQuestion] = useState(null);
//   const [isHost, setIsHost] = useState(false);
//   const [duelStarted, setDuelStarted] = useState(false);

//   const [language, setLanguage] = useState("javascript");

//   const JUDGE0_LANGUAGE_MAP = {
//     javascript: 63,
//     python: 71,
//     cpp: 54,
//     java: 62,
//   };

//   // ------------------- CODE RUNNER STATE -------------------
//   const [code, setCode] = useState({
//     javascript: "// JS starter code\n",
//     python: "# Python starter code\n",
//     cpp: "// C++ starter code\n",
//     java: "class Solution {\n  public static void main(String[] args) {\n    // Java starter\n  }\n}\n",
//   });

//   const [output, setOutput] = useState("");
//   const [runStatus, setRunStatus] = useState(null);

//   const getSource = () => code[language];

//   // ---------------------- SOCKET SETUP ----------------------
//   useEffect(() => {
//     if (!socket) return;

//     console.log("🔥 Room mounted. socket =", socket, "roomId =", roomId);

//     // ------- Listeners FIRST (IMPORTANT!) -------
//     const onHost = () => {
//       console.log("🔥 CLIENT RECEIVED HOST EVENT");
//       setIsHost(true);
//     };

//     const onJoined = (data) => {
//       console.log("👥 Opponent joined:", data);
//     };

//     const onStart = ({ question }) => {
//       console.log("🔥 start_duel RECEIVED. Question =", question);
//       setQuestion(question);
//       setDuelStarted(true);
//     };

//     const onOffer = async ({ offer }) => {
//       await handleReceiveOffer(offer);
//     };

//     const onAnswer = async ({ answer }) => {
//       if (peerRef.current) await peerRef.current.setRemoteDescription(answer);
//     };

//     const onIce = async ({ candidate }) => {
//       if (peerRef.current && candidate)
//         await peerRef.current.addIceCandidate(candidate);
//     };

//     socket.on("room:host", onHost);
//     socket.on("room:joined", onJoined);
//     socket.on("room:start_duel", onStart);
//     socket.on("webrtc:offer", onOffer);
//     socket.on("webrtc:answer", onAnswer);
//     socket.on("webrtc:ice_candidate", onIce);

//     // ------- JOIN LOGIC -------
//     if (socket.lastCreatedRoom === roomId) {
//       console.log("🟢 This user CREATED the room → Mark as host");
//       setIsHost(true);
//     } else {
//       console.log("🟠 This user JOINED the room → requesting join");
//       socket.emit("lobby:join_room", { roomId }, (res) => {
//         console.log("join_room callback:", res);
//         if (!res.ok) alert("Could not join room");
//       });
//     }

//     return () => {
//       socket.off("room:host", onHost);
//       socket.off("room:joined", onJoined);
//       socket.off("room:start_duel", onStart);
//       socket.off("webrtc:offer", onOffer);
//       socket.off("webrtc:answer", onAnswer);
//       socket.off("webrtc:ice_candidate", onIce);

//       if (peerRef.current) {
//         peerRef.current.close();
//         peerRef.current = null;
//       }
//     };
//   }, [socket, roomId]);

//   // -------------------- START DUEL -------------------------
//   function startDuel() {
//     const sampleQuestion = {
//       title: "Two Sum",
//       description:
//         "Given an array nums and a target, return the indices of the two numbers that add up to the target.",
//       example: "nums=[2,7,11,15], target=9 → [0,1]",
//       constraints: "1 <= nums.length <= 10^4",
//     };

//     socket.emit("room:start_duel", { roomId, question: sampleQuestion });
//   }

//   // ---------------------- AUDIO ----------------------------
//   async function joinAudio() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     pc.ontrack = (e) => setRemoteStream(e.streams[0]);

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", { roomId, candidate: e.candidate });
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     socket.emit("webrtc:offer", { roomId, offer });
//   }

//   async function handleReceiveOffer(offer) {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//     pc.ontrack = (e) => setRemoteStream(e.streams[0]);

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", { roomId, candidate: e.candidate });
//     };

//     await pc.setRemoteDescription(offer);
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     socket.emit("webrtc:answer", { roomId, answer });
//   }

//   // ---------------------- RUN CODE -------------------------
//   async function runCode(stdin = "") {
//     try {
//       setRunStatus("running");
//       setOutput("Running...");

//       const payload = {
//         source_code: getSource(),
//         language_id: JUDGE0_LANGUAGE_MAP[language],
//         stdin,
//       };

//       const res = await fetch("http://localhost:4000/api/judge/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (data.compile_output) {
//         setOutput(`Compile Error:\n${data.compile_output}`);
//       } else if (data.stderr) {
//         setOutput(`Runtime Error:\n${data.stderr}`);
//       } else {
//         setOutput(`Output:\n${data.stdout ?? ""}`);
//       }

//       setRunStatus("done");
//     } catch (err) {
//       setOutput("Error: " + err.message);
//       setRunStatus("error");
//     }
//   }

//   async function submitCode() {
//     setRunStatus("running");
//     setOutput("Submitting...");

//     const payload = {
//       source_code: getSource(),
//       language_id: JUDGE0_LANGUAGE_MAP[language],
//     };

//     const res = await fetch("http://localhost:4000/api/judge/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     setOutput(JSON.stringify(data, null, 2));
//     setRunStatus("done");
//   }

//   // ---------------------- UI -------------------------------
//   return (
//     <div className="room-wrapper">
//       <h2>Room: {roomId}</h2>

//       {!duelStarted && isHost && (
//         <button className="btn-start" onClick={startDuel}>
//           Start Duel
//         </button>
//       )}

//       {duelStarted && question && (
//         <div className="question-box">
//           <h3>{question.title}</h3>
//           <p>{question.description}</p>
//           <p><strong>Example:</strong> {question.example}</p>
//           <p><strong>Constraints:</strong> {question.constraints}</p>
//         </div>
//       )}

//       <button className="btn-primary" onClick={joinAudio}>
//         Join Audio Call
//       </button>

//       <div className="lang-select-box">
//         <label>Language: </label>
//         <select
//           className="lang-select"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>
//       </div>

//       {/* ---------- CODE EDITOR + RUN/SUBMIT ---------- */}
//       <div className="editor-container">
//         <Editor
//           height="350px"
//           language={language}
//           value={code[language]}
//           onChange={(val) =>
//             setCode((prev) => ({ ...prev, [language]: val || "" }))
//           }
//           options={{ automaticLayout: true }}
//         />

//         <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//           <button className="btn-primary" onClick={() => runCode()}>
//             Run Code
//           </button>
//           <button className="btn-secondary" onClick={submitCode}>
//             Submit
//           </button>
//           <button
//             className="btn-clear"
//             onClick={() => {
//               setCode((p) => ({ ...p, [language]: "" }));
//               setOutput("");
//             }}
//           >
//             Clear
//           </button>
//         </div>

//         <div className="output-box">
//           <h3>Output</h3>
//           <pre>{runStatus === "running" ? "Running..." : output}</pre>
//         </div>
//       </div>

//       {/* OPPONENT AUDIO */}
//       <div className="audio-container">
//         <h3>Opponent Audio</h3>
//         {remoteStream ? (
//           <audio
//             autoPlay
//             controls
//             ref={(el) => el && (el.srcObject = remoteStream)}
//           />
//         ) : (
//           <p>Waiting for opponent...</p>
//         )}
//       </div>
//     </div>
//   );
// }





// import { useEffect, useRef, useState } from "react";
// import { Editor } from "@monaco-editor/react";
// import "./room.css";

// export default function Room({ socket, roomId }) {
//   const [remoteStream, setRemoteStream] = useState(null);
//   const peerRef = useRef(null);
//   const localStreamRef = useRef(null);

//   const [question, setQuestion] = useState(null);
//   const [isHost, setIsHost] = useState(false);
//   const [duelStarted, setDuelStarted] = useState(false);

//   const [language, setLanguage] = useState("javascript");

//   const JUDGE0_LANGUAGE_MAP = {
//     javascript: 63,
//     python: 71,
//     cpp: 54,
//     java: 62,
//   };

//   const [code, setCode] = useState({
//     javascript: "// JS code here\n",
//     python: "# Python code here\n",
//     cpp: "// C++ code here\n",
//     java: "class Solution { public static void main(String[] args) {} }",
//   });

//   const [output, setOutput] = useState("");

//   // Convert LC HTML → text
//   function stripHTML(html) {
//     const div = document.createElement("div");
//     div.innerHTML = html;
//     return div.innerText;
//   }

//   // ---------------------- Fetch Random LeetCode ----------------------
//   async function fetchRandomLeetCode() {
//     const res = await fetch("http://localhost:4000/api/leetcode/random");
//     const q = await res.json();

//     return {
//       title: q.title || "Untitled Problem",
//       description: stripHTML(q.content || "No description available."),
//       example: q.sampleTestCase || "No example",
//       difficulty: q.difficulty || "Unknown",
//     };
//   }

//   function resetEditor() {
//     setOutput("");
//     setCode((prev) => ({
//       ...prev,
//       [language]: "// Start coding...\n",
//     }));
//   }

//   // ---------------------- SOCKET SETUP ----------------------
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("room:host", () => setIsHost(true));

//     socket.on("room:start_duel", ({ question }) => {
//       setQuestion(question);
//       setDuelStarted(true);
//       resetEditor();
//     });

//     socket.on("room:next_question", ({ question }) => {
//       setQuestion(question);
//       resetEditor();
//     });

//     socket.on("webrtc:offer", async ({ offer }) => {
//       await handleReceiveOffer(offer);
//     });

//     socket.on("webrtc:answer", async ({ answer }) => {
//       if (peerRef.current) await peerRef.current.setRemoteDescription(answer);
//     });

//     socket.on("webrtc:ice_candidate", async ({ candidate }) => {
//       if (peerRef.current && candidate)
//         await peerRef.current.addIceCandidate(candidate);
//     });

//     if (socket.lastCreatedRoom === roomId) {
//       setIsHost(true);
//     } else {
//       socket.emit("lobby:join_room", { roomId }, (res) => {
//         if (!res.ok) alert("Join failed");
//       });
//     }
//   }, [socket, roomId]);

//   // ---------------------- START DUEL ----------------------
//   async function startDuel() {
//     const q = await fetchRandomLeetCode();
//     socket.emit("room:start_duel", { roomId, question: q });
//   }

//   // ---------------------- NEXT QUESTION ----------------------
// async function nextQuestion() {
//   try {
//     console.log("➡️ NEXT QUESTION CLICKED");

//     const q = await fetchRandomLeetCode();
//     console.log("📦 New question:", q);

//     socket.emit("room:next_question", { roomId, question: q });
//   } catch (err) {
//     console.error("❌ Error in nextQuestion:", err);
//   }
// }


//   // ---------------------- NEXT QUESTION ----------------------
// //   async function nextQuestion() {
// //     const q = await fetchRandomLeetCode();
// //     socket.emit("room:next_question", { roomId, question: q });
// //   }



// async function fetchRandomLeetCode() {
//   const res = await fetch("http://localhost:4000/api/leetcode/random");
//   const q = await res.json();

//   return {
//     title: q.title ?? "Untitled Problem",
//     description: q.description ?? "No description provided.",
//     example: q.example ?? "No example provided.",
//     difficulty: q.difficulty ?? "Unknown"
//   };
// }

//   // ---------------------- AUDIO ----------------------
//   async function joinAudio() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((t) => pc.addTrack(t, stream));

//     pc.ontrack = (e) => setRemoteStream(e.streams[0]);

//     pc.onicecandidate = (e) => {
//       if (e.candidate)
//         socket.emit("webrtc:ice_candidate", { roomId, candidate: e.candidate });
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     socket.emit("webrtc:offer", { roomId, offer });
//   }

//   async function handleReceiveOffer(offer) {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStreamRef.current = stream;

//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current = pc;

//     stream.getTracks().forEach((t) => pc.addTrack(t, stream));

//     pc.ontrack = (e) => setRemoteStream(e.streams[0]);

//     await pc.setRemoteDescription(offer);
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     socket.emit("webrtc:answer", { roomId, answer });
//   }

//   // ---------------------- RUN CODE ----------------------
//   async function runCode() {
//     setOutput("Running...");

//     const res = await fetch("http://localhost:4000/api/judge/run", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         source_code: code[language],
//         language_id: JUDGE0_LANGUAGE_MAP[language],
//       }),
//     });

//     const data = await res.json();

//     if (data.compile_output) setOutput("Compile Error:\n" + data.compile_output);
//     else if (data.stderr) setOutput("Error:\n" + data.stderr);
//     else setOutput(data.stdout || "No output");
//   }

//   // ---------------------- SUBMIT CODE ----------------------
//   async function submitCode() {
//     setOutput("Submitting...");

//     const res = await fetch("http://localhost:4000/api/judge/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         source_code: code[language],
//         language_id: JUDGE0_LANGUAGE_MAP[language],
//       }),
//     });

//     const data = await res.json();
//     setOutput(JSON.stringify(data, null, 2));
//   }

//   // ---------------------- UI ----------------------
//   return (
//     <div className="room-wrapper">
//       <h2>Room: {roomId}</h2>

//       {!duelStarted && isHost && (
//         <button className="btn-start" onClick={startDuel}>
//           Start Duel (LeetCode)
//         </button>
//       )}

//       {duelStarted && question && (
//         <div className="question-box">
//           <h3>{question.title}</h3>
//           <p>{question.description}</p>
//           <p><strong>Example:</strong> {question.example}</p>
//           <p><strong>Difficulty:</strong> {question.difficulty}</p>

//           {isHost && (
//             <button className="btn-secondary" onClick={nextQuestion}>
//               Next Question
//             </button>
//           )}
//         </div>
//       )}

//       {/* AUDIO CALL */}
//       <button className="btn-primary" onClick={joinAudio}>
//         Join Audio Call
//       </button>

//       {/* Language selector */}
//       <div className="lang-select-box">
//         <label>Language:</label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="lang-select"
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>
//       </div>

//       {/* EDITOR */}
//       <div className="editor-container">
//         <Editor
//           height="350px"
//           language={language}
//           value={code[language]}
//           onChange={(value) =>
//             setCode((p) => ({ ...p, [language]: value || "" }))
//           }
//         />

//         <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
//           <button className="btn-primary" onClick={runCode}>
//             Run Code
//           </button>
//           <button className="btn-secondary" onClick={submitCode}>
//             Submit Code
//           </button>
//           <button
//             className="btn-clear"
//             onClick={() => {
//               setCode((p) => ({ ...p, [language]: "" }));
//               setOutput("");
//             }}
//           >
//             Clear
//           </button>
//         </div>

//         <div className="output-box">
//           <h3>Output</h3>
//           <pre>{output}</pre>
//         </div>
//       </div>

//       {/* REMOTE AUDIO */}
//       <div className="audio-container">
//         <h3>Opponent Audio</h3>
//         {remoteStream ? (
//           <audio autoPlay controls ref={(el) => el && (el.srcObject = remoteStream)} />
//         ) : (
//           <p>Waiting for opponent...</p>
//         )}
//       </div>
//     </div>
//   );
// }






import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import "./room.css";

export default function Room({ socket, roomId }) {
  const [remoteStream, setRemoteStream] = useState(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  const [question, setQuestion] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [duelStarted, setDuelStarted] = useState(false);

  const [language, setLanguage] = useState("javascript");

  const JUDGE0_LANGUAGE_MAP = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62,
  };

  const [code, setCode] = useState({
    javascript: "// JS code here\n",
    python: "# Python code here\n",
    cpp: "// C++ code here\n",
    java: "class Solution { public static void main(String[] args) {} }",
  });

  const [output, setOutput] = useState("");

//   Audio Success & crore
const successSound = new Audio("/sounds/7 Crore Meme Audio Download Mp3.mp3");


  // ----------------------
  // Helpers
  // ----------------------
  function stripHTML(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText;
  }

  // Single fetch function (no duplicates)
  async function fetchRandomLeetCode() {
    try {
      const res = await fetch("http://localhost:4000/api/leetcode/random");
      const q = await res.json();

      return {
        title: q.title ?? "Untitled Problem",
        description: (q.description !== undefined) ? q.description : stripHTML(q.content || "No description available."),
        example: q.example ?? q.sampleTestCase ?? "No example",
        difficulty: q.difficulty ?? "Unknown",
      };
    } catch (err) {
      console.error("Error fetching LeetCode question:", err);
      return {
        title: "Untitled Problem",
        description: "Failed to fetch question.",
        example: "No example",
        difficulty: "Unknown",
      };
    }
  }

  function resetEditor() {
    setOutput("");
    setCode((prev) => ({
      ...prev,
      [language]: "// Start coding...\n",
    }));
  }

  // ---------------------- SOCKET SETUP ----------------------
  useEffect(() => {
    if (!socket) return;

    console.log("🔥 Room mounted.", { roomId, socket });

    const onHost = () => {
      console.log("🔥 CLIENT RECEIVED HOST EVENT");
      setIsHost(true);
    };

    const onStart = ({ question }) => {
      console.log("🔥 start_duel RECEIVED. Question =", question);
      setQuestion(question);
      setDuelStarted(true);
      resetEditor();
    };

    const onNext = ({ question }) => {
      console.log("🔥 next_question RECEIVED. Question =", question);
      setQuestion(question);
      resetEditor();
    };

    const onJoined = (data) => {
      console.log("👥 Opponent joined:", data);
    };

    socket.on("room:host", onHost);
    socket.on("room:joined", onJoined);
    socket.on("room:start_duel", onStart);
    socket.on("room:next_question", onNext);

    // WebRTC signaling handlers (we receive offers/answers/candidates here)
    socket.on("webrtc:offer", async ({ offer }) => {
      console.log("📩 Received webrtc:offer via socket");
      await handleReceiveOffer(offer);
    });

    socket.on("webrtc:answer", async ({ answer }) => {
      console.log("📩 Received webrtc:answer via socket");
      if (peerRef.current) {
        try {
          await peerRef.current.setRemoteDescription(answer);
        } catch (err) {
          console.error("Error setting remote description (answer):", err);
        }
      }
    });

    socket.on("webrtc:ice_candidate", async ({ candidate }) => {
      // safe add candidate
      if (!candidate) return;
      if (peerRef.current) {
        try {
          await peerRef.current.addIceCandidate(candidate);
          console.log("➕ Added remote ICE candidate");
        } catch (err) {
          console.warn("Could not add ICE candidate yet:", err);
        }
      } else {
        console.log("🔶 Received ICE candidate but peerRef not ready yet — buffering ignored");
      }
    });

    // Join or mark host
    if (socket.lastCreatedRoom === roomId) {
      console.log("🟢 This user CREATED the room → Mark as host");
      setIsHost(true);
    } else {
      console.log("🟠 This user JOINED the room → requesting join");
      socket.emit("lobby:join_room", { roomId }, (res) => {
        console.log("join_room callback:", res);
        if (!res.ok) alert("Could not join room");
      });
    }

    // cleanup
    return () => {
      socket.off("room:host", onHost);
      socket.off("room:joined", onJoined);
      socket.off("room:start_duel", onStart);
      socket.off("room:next_question", onNext);

      socket.off("webrtc:offer");
      socket.off("webrtc:answer");
      socket.off("webrtc:ice_candidate");

      if (peerRef.current) {
        try {
          peerRef.current.close();
        } catch (e) {}
        peerRef.current = null;
      }
    };
  }, [socket, roomId]);

  // -------------------- START / NEXT QUESTION -------------------------
  async function startDuel() {
    try {
      console.log("▶️ Start Duel clicked");
      const q = await fetchRandomLeetCode();
      console.log("📦 LeetCode question fetched:", q);
      socket.emit("room:start_duel", { roomId, question: q });
      console.log("📡 Emitted room:start_duel");
    } catch (err) {
      console.error("Error in startDuel:", err);
    }
  }

  async function nextQuestion() {
    try {
      console.log("➡️ NEXT QUESTION CLICKED");
      const q = await fetchRandomLeetCode();
      console.log("📦 New question:", q);
      socket.emit("room:next_question", { roomId, question: q });
    } catch (err) {
      console.error("❌ Error in nextQuestion:", err);
    }
  }

  // ---------------------- AUDIO (WebRTC) ----------------------
  async function joinAudio() {
    console.log("JOIN AUDIO CLICKED");
    try {
      // if a peer already exists, close it and create a fresh one
      if (peerRef.current) {
        try {
          peerRef.current.close();
        } catch (e) {}
        peerRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("🎤 got local stream", stream);
      localStreamRef.current = stream;

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      peerRef.current = pc;

      // add local tracks
      stream.getTracks().forEach((track) => {
        console.log("Adding local track:", track.kind);
        pc.addTrack(track, stream);
      });

      // handle incoming remote stream
      pc.ontrack = (e) => {
        console.log("🎧 ontrack fired, setting remote stream");
        if (e.streams && e.streams[0]) {
          setRemoteStream(e.streams[0]);
        }
      };

      // ICE candidates -> send to server
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("❄️ Sending ICE candidate");
          socket.emit("webrtc:ice_candidate", { roomId, candidate: event.candidate });
        }
      };

      // create offer
      console.log("📢 creating offer");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("webrtc:offer", { roomId, offer });
      console.log("📡 Offer emitted over socket");
    } catch (err) {
      console.error("Error in joinAudio:", err);
      alert("Failed to get microphone or create call: " + err.message);
    }
  }

  async function handleReceiveOffer(offer) {
    console.log("handleReceiveOffer called");
    try {
      // close existing pc if any
      if (peerRef.current) {
        try {
          peerRef.current.close();
        } catch (e) {}
        peerRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("🎤 (answerer) got local stream", stream);
      localStreamRef.current = stream;

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      peerRef.current = pc;

      stream.getTracks().forEach((t) => {
        console.log("answerer adding local track:", t.kind);
        pc.addTrack(t, stream);
      });

      pc.ontrack = (e) => {
        console.log("answerer ontrack fired");
        if (e.streams && e.streams[0]) {
          setRemoteStream(e.streams[0]);
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("❄️ (answerer) sending ICE candidate");
          socket.emit("webrtc:ice_candidate", { roomId, candidate: event.candidate });
        }
      };

      await pc.setRemoteDescription(offer);
      console.log("📢 creating answer (answerer)");
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("webrtc:answer", { roomId, answer });
      console.log("📡 Answer emitted over socket");
    } catch (err) {
      console.error("Error in handleReceiveOffer:", err);
    }
  }

  // ---------------------- RUN / SUBMIT CODE ----------------------
  async function runCode() {
    setOutput("Running...");

    try {
      const res = await fetch("http://localhost:4000/api/judge/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code[language],
          language_id: JUDGE0_LANGUAGE_MAP[language],
        }),
      });

      const data = await res.json();

      if (data.compile_output) setOutput("Compile Error:\n" + data.compile_output);
      else if (data.stderr) setOutput("Error:\n" + data.stderr);
      else setOutput(data.stdout || "No output");
    } catch (err) {
      console.error("Run error:", err);
      setOutput("Run error: " + err.message);
    }
  }

  async function submitCode() {
    setOutput("Submitting...");

    try {
      const res = await fetch("http://localhost:4000/api/judge/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code[language],
          language_id: JUDGE0_LANGUAGE_MAP[language],
        }),
      });

      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
        // audio sucess 7 cr
         if (data.status?.id === 3) {
      successSound.play().catch(() => {});
    }

    } catch (err) {
      console.error("Submit error:", err);
      setOutput("Submit error: " + err.message);
    }
  }

  // ---------------------- UI ----------------------
  return (
    <div className="room-wrapper">
      <h2>Room: {roomId}</h2>

      {!duelStarted && isHost && (
        <button className="btn-start" onClick={startDuel}>
          Start Duel  (LeetCode)
        </button>
      )}

      {duelStarted && question && (
        <div className="question-box">
          <h3>{question.title}</h3>
          <p>{question.description}</p>
          <p><strong>Example:</strong> {question.example}</p>
          <p><strong>Difficulty:</strong> {question.difficulty}</p>

          {isHost && (
            <button className="btn-secondary" onClick={nextQuestion}>
              Next Question
            </button>
          )}
        </div>
      )}

      {/* AUDIO CALL */}
      <button className="btn-primary" onClick={joinAudio}>
        Join Audio Call
      </button>

      {/* Language selector */}
      <div className="lang-select-box">
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="lang-select"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* EDITOR */}
      <div className="editor-container">
        <Editor
          height="350px"
          language={language}
          value={code[language]}
          onChange={(value) =>
            setCode((p) => ({ ...p, [language]: value || "" }))
          }
        />

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button className="btn-primary" onClick={runCode}>
            Run Code
          </button>
          <button className="btn-secondary" onClick={submitCode}>
            Submit Code
          </button>
          <button
            className="btn-clear"
            onClick={() => {
              setCode((p) => ({ ...p, [language]: "" }));
              setOutput("");
            }}
          >
            Clear
          </button>
        </div>

        <div className="output-box">
          <h3>Output</h3>
          <pre>{output}</pre>
        </div>
      </div>

      {/* REMOTE AUDIO */}
      <div className="audio-container">
        <h3>Opponent Audio</h3>
        {remoteStream ? (
          <audio autoPlay controls ref={(el) => el && (el.srcObject = remoteStream)} />
        ) : (
          <p>Waiting for opponent...</p>
        )}
      </div>
    </div>
  );
}
