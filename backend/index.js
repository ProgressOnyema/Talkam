import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatbotRoute from "./routes/chatbot.js";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import connectionDB from "./db.js";

// Load environment variables
dotenv.config();

const app = express();
const port = 8000;

// DB Connection
connectionDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/chatbot", chatbotRoute);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
