const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authmiddleware");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server Running");
});
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views/register.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views/dashboard.html"));
});
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
