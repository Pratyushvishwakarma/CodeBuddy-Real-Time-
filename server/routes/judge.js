// server/routes/judge.js
const express = require("express");
const router = express.Router();

// Using global fetch available in node 18+ (Node 22 ok)
const JUDGE0_HOST = process.env.RAPIDAPI_HOST || "judge0-ce.p.rapidapi.com";
const JUDGE0_KEY = process.env.RAPIDAPI_KEY;

// Helper to call judge0 (wait=true returns result synchronously)
async function callJudge0(payload) {
  const url = `https://${JUDGE0_HOST}/submissions?base64_encoded=false&wait=true`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": JUDGE0_KEY,
      "X-RapidAPI-Host": JUDGE0_HOST,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Judge0 API error: ${res.status} ${text}`);
  }

  return res.json();
}

// Run code endpoint
router.post("/run", async (req, res) => {
  try {
    const { source_code, language_id, stdin } = req.body;

    if (!source_code || !language_id) {
      return res.status(400).json({ error: "source_code and language_id required" });
    }

    const payload = {
      source_code,
      language_id: Number(language_id),
      stdin: stdin || "",
      // You can set other fields: redirect_stderr_to_stdout, cpu_time_limit, memory_limit, etc.
    };

    const result = await callJudge0(payload);
    // result contains stdout, stderr, status, compile_output etc.
    res.json(result);
  } catch (err) {
    console.error("Judge /run error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Submit endpoint (same as run for now)
router.post("/submit", async (req, res) => {
  try {
    const { source_code, language_id, stdin } = req.body;
    if (!source_code || !language_id) {
      return res.status(400).json({ error: "source_code and language_id required" });
    }

    const payload = {
      source_code,
      language_id: Number(language_id),
      stdin: stdin || "",
    };

    const result = await callJudge0(payload);
    res.json(result);
  } catch (err) {
    console.error("Judge /submit error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
