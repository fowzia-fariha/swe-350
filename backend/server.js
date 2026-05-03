const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create upload directories
const uploadDir = path.join(__dirname, 'uploads');
const submissionsDir = path.join(__dirname, 'submissions');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'submissions/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

app.locals.upload = upload;

// Serve static files
app.use('/uploads', express.static(uploadDir));
app.use('/submissions', express.static(submissionsDir));

// Routes
const dashboardRoutes = require("./routes/student/dashboardRoutes");
const assignmentRoutes = require("./routes/student/assignmentRoutes");

const authRoutes = require("./routes/student/authRoutes");
app.use("/api/auth", authRoutes);
// Add this with other routes
const studyMaterialRoutes = require("./routes/student/studyMaterialRoutes");
app.use("/api/student", studyMaterialRoutes);

const liveSessionRoutes = require("./routes/student/liveSessionRoutes");
app.use("/api/student", liveSessionRoutes);

const crRoutes = require("./routes/student/crRoutes");
app.use("/api/student", crRoutes);


const teacherAssignmentRoutes = require("./routes/teacher/assignmentRoutes");
app.use("/api/teacher", teacherAssignmentRoutes);
// Add this with other route imports
const courseOverviewRoutes = require("./routes/student/courseOverviewRoutes");

// Add this with other app.use statements
app.use("/api/student", courseOverviewRoutes);

app.use("/api/student", dashboardRoutes);
app.use("/api/student", assignmentRoutes);

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Backend working" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});