import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Octokit } from "@octokit/rest";
import Groq from "groq-sdk";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Initialize Octokit for GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Required for private repos
});

// 🔹 Initialize Groq API for AI Audits
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// 🔹 MongoDB Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const auditSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contract_name: { type: String, required: true },
  solidity_code: { type: String, required: true },
  audit_result: { type: String, required: true },
  patched_code: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Audit = mongoose.model('Audit', auditSchema);

// 🔹 Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// 🔹 Home Route
app.get("/", (req, res) => {
  res.send("Server is working and running...");
});

// 🔹 User Registration
app.post("/register", async (req, res) => {
  const { username, passwd } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(passwd, 10);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Registration error", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// 🔹 User Login
app.post("/login", async (req, res) => {
  const { username, passwd } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid username and password" });
    }

    const isMatch = await bcrypt.compare(passwd, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, msg: "Login successful" });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// 🔹 Fetch Previous Audits
app.get("/audits", authenticate, async (req, res) => {
  try {
    const audits = await Audit.find({ user_id: req.user.userId }).sort({ createdAt: -1 });
    res.json(audits);
  } catch (error) {
    console.error("Error fetching audits:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// 🔹 Submit a New Audit with AI Analysis
app.post("/audit", authenticate, async (req, res) => {
  const { contract_name, solidity_code, github_url } = req.body;
  let contractCode = solidity_code;

  if (!contract_name) {
    return res.status(400).json({ msg: "Contract name is required" });
  }

  try {
    // 🔥 Fetch Solidity code from GitHub if no direct input
    if (!solidity_code && github_url) {
      console.log(`Fetching contract from GitHub: ${github_url}`);
      const rawUrl = github_url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
      const response = await fetch(rawUrl);
      if (!response.ok) {
        return res.status(400).json({ msg: "Failed to fetch Solidity code from GitHub" });
      }
      contractCode = await response.text();
    }

    // Validate Solidity code
    if (!contractCode) {
      return res.status(400).json({ msg: "No Solidity code provided" });
    }

    // 🔥 AI Audit using Groq Qwen-2.5-Coder-32B
    console.log("🚀 Sending Solidity code to Groq API...");
    const aiResponse = await groq.chat.completions.create({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      messages: [
        { role: "system", content: "Analyze this Solidity contract for vulnerabilities and gas optimizations. Identify the specific lines where the bugs exist, mention case study references related to these vulnerabilities, and return a fully patched version of the contract with fixes implemented."},
        { role: "user", content: contractCode },
      ],
      max_tokens: 3500,
    });

    // Handle AI response
    if (!aiResponse || !aiResponse.choices || aiResponse.choices.length === 0) {
      console.error("❌ AI Response Error: Unexpected response format");
      return res.status(500).json({ msg: "AI audit failed" });
    }

    const audit_result = aiResponse.choices[0].message.content.trim();
    console.log("🟢 AI Audit Completed:", audit_result);

    // Extract patched code from AI response (if provided)
    let patchedCode = contractCode;
    const patchedCodeMatch = audit_result.match(/```solidity([\s\S]*?)```/);
    if (patchedCodeMatch) {
      patchedCode = patchedCodeMatch[1].trim();
    }

    // 🔹 Save Audit Results in Database
    const audit = new Audit({
      user_id: req.user.userId,
      contract_name,
      solidity_code: contractCode,
      audit_result,
      patched_code: patchedCode
    });
    const savedAudit = await audit.save();

    res.json({ msg: "Audit successful", audit: savedAudit });

  } catch (error) {
    console.error("Audit error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.get("/attacks", async (req, res) => {
  try {
    console.log("Fetching latest attack data...");
    const response = await axios.get("https://api.llama.fi/hacks");

    if (!response.data || !Array.isArray(response.data)) {
      console.error("Invalid response format from API.");
      return res.status(500).json({ msg: "Error fetching attack data" });
    }

    const attacks = response.data.map((attack) => ({
      technique: attack.technique,
      amount: attack.amount,
      source: attack.source,
    }));

    res.json(attacks);
  } catch (error) {
    console.error("Error fetching attack data:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// 🔹 Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));

