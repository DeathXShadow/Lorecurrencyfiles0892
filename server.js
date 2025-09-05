// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = "users.json";

// Load users
function loadUsers() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// Get all users
app.get("/users", (req, res) => {
  res.json(loadUsers());
});

// Update one user
app.post("/updateUser", (req, res) => {
  const { index, balance, subscription } = req.body;
  let users = loadUsers();

  if (users[index]) {
    if (balance !== undefined) users[index].balance = balance;
    if (subscription !== undefined) users[index].subscription = subscription;

    saveUsers(users);
    res.json({ success: true, user: users[index] });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
