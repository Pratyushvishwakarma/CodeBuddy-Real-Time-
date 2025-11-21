// const express = require("express");
// const router = express.Router();

// const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

// function randomItem(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// router.get("/random", async (req, res) => {
//   try {
//     // 1️⃣ Fetch question list
//     const listQuery = {
//       query: `
//         query problemsetQuestionList {
//           problemsetQuestionList(categorySlug: "", limit: 500, skip: 0) {
//             questions {
//               title
//               titleSlug
//               difficulty
//             }
//           }
//         }
//       `
//     };

//     const listRes = await fetch(LEETCODE_GRAPHQL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(listQuery),
//     });

//     const listData = await listRes.json();

//     const questions = listData?.data?.problemsetQuestionList?.questions || [];
//     if (!questions.length) {
//       return res.status(500).json({ error: "Failed to fetch question list" });
//     }

//     const chosen = randomItem(questions);

//     // 2️⃣ Fetch full question detail
//     const detailQuery = {
//       query: `
//         query question($titleSlug: String!) {
//           question(titleSlug: $titleSlug) {
//             title
//             content
//             difficulty
//             sampleTestCase
//           }
//         }
//       `,
//       variables: { titleSlug: chosen.titleSlug },
//     };

//     const detailRes = await fetch(LEETCODE_GRAPHQL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(detailQuery),
//     });

//     const detailData = await detailRes.json();
//     const q = detailData?.data?.question;

//     if (!q) return res.status(500).json({ error: "Failed to load question" });

//     res.json({
//       title: q.title,
//       content: q.content ?? "",
//       difficulty: q.difficulty ?? "NA",
//       sampleTestCase: q.sampleTestCase ?? "N/A",
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "LeetCode fetch failed" });
//   }
// });

// module.exports = router;






// const express = require("express");
// const router = express.Router();

// // unofficial LeetCode API
// const BASE = "https://leetcode-api-faisalshohag.vercel.app";

// function randomSlug(list) {
//   const random = Math.floor(Math.random() * list.length);
//   return list[random].titleSlug;
// }

// router.get("/random", async (req, res) => {
//   try {
//     // 1️⃣ Fetch full question list with slugs
//     const listRes = await fetch(`${BASE}/api/problems/all`);
//     const listData = await listRes.json();

//     if (!listData || !listData.problems || listData.problems.length === 0) {
//       return res.status(500).json({ error: "Failed to load question list" });
//     }

//     const slug = randomSlug(listData.problems);

//     // 2️⃣ Fetch question details
//     const detailRes = await fetch(`${BASE}/problem/${slug}`);
//     const q = await detailRes.json();

//     if (!q) return res.status(500).json({ error: "Failed to load question detail" });

//     res.json({
//       title: q.title,
//       content: q.description,
//       difficulty: q.difficulty,
//       sampleTestCase: q.exampleTestcases,
//     });

//   } catch (err) {
//     console.error("LeetCode ERROR:", err);
//     res.status(500).json({ error: "Server error fetching LeetCode question" });
//   }
// });

// module.exports = router;







const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load local questions
const questionsPath = path.join(__dirname, "../data/questions.json");
const questions = JSON.parse(fs.readFileSync(questionsPath, "utf8"));

function randomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

router.get("/random", (req, res) => {
  const q = randomQuestion();
  res.json(q);
});

module.exports = router;
