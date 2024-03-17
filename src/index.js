import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import chalk from "chalk";
import { Server } from "socket.io";
import { config } from "dotenv";

import { sequelize, syncAllDB } from "./db/index.js";
import { models } from "./db/models/index.js";
import { authRouter, userRouter, postRouter } from "./routes/index.js";

config();
const app = express();
const server = createServer(app);

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4173",
  ], // Whitelist the domains you want to allow
};
app.use(cors(corsOptions));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const baseURL = "/api/v1/";
app.use(`${baseURL}auth`, authRouter);
app.use(`${baseURL}user`, userRouter);
app.use(`${baseURL}post`, postRouter);

// socket.io connection..
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(chalk.bgYellow("User connected to socket.io..."));
});

try {
  await sequelize.authenticate();
  console.log(chalk.green("Connection has been established successfully."));
  syncAllDB(models);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

server.listen(process.env.CRICBOOK_APP_PORT, () =>
  console.log(
    chalk.magenta(`Server running on port ${process.env.CRICBOOK_APP_PORT}...`)
  )
);
