import express from "express";
import cors from "cors";
import { sequelize, syncAllDB } from "db";
import { models } from "models";
import { authRouter } from "routes";

export const app = express();
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

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  syncAllDB(models);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// TODO: implement pino.js logger later...

if (import.meta.env.PROD) app.listen(3000);
export const viteNodeApp = app;
