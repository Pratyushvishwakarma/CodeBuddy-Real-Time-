const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    duelRating: { type: Number, default: 1000 },
    helperRating: { type: Number, default: 1000 },
    helperXP: { type: Number, default: 0 },
    badges: [{ id: String, name: String, date: Date }],
    stats: {
      totalWins: { type: Number, default: 0 },
      totalMatches: { type: Number, default: 0 },
      totalHelpsGiven: { type: Number, default: 0 },
      totalHelpsReceived: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
