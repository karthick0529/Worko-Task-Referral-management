const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const Candidate = require("./models/Candidate");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI);

const upload = multer({
  dest: process.env.UPLOADS_PATH || "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only .pdf files are allowed!"));
  },
});

// Routes
app.post("/candidates", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;
    const resumeUrl = req.file ? req.file.path : null;
    const candidate = new Candidate({
      name,
      email,
      phone,
      jobTitle,
      status: "Pending",
      resumeUrl,
    });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/candidates/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
