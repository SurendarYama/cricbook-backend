import express from "express";
import cors from "cors";
import { bootRouter } from "src/router.js";
import { sequelize, syncAllDB } from "db";
import { models } from "models";

const app = express();

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  syncAllDB(models);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"], // Whitelist the domains you want to allow
};
app.use(cors(corsOptions));
// TODO: implement pino.js logger later...

bootRouter(app);
if (import.meta.env.PROD) app.listen(3000);
export const viteNodeApp = app;
