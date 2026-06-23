const express =
require("express");

const cors =
require("cors");

const dotenv =
require("dotenv");

const connectDB =
require("./config/db");

dotenv.config();

connectDB();

const app =
express();

app.use(cors());

app.use(express.json());

app.get(
"/",
(req,res)=>{
    res.send(
    "ATC Training System API Running"
    );
}
);

// Auth Routes

app.use(
"/api/auth",
require("./routes/authRoutes")
);

// Attendance Routes

app.use(
"/api/attendance",
require("./routes/attendanceRoutes")
);

app.use(
"/api/trainees",
require("./routes/traineeRoutes")
);

const PORT =
process.env.PORT || 5000;

app.listen(
PORT,
()=>{
    console.log(
    `Server Running On Port ${PORT}`
    );
}
);