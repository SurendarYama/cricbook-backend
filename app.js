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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:5173"], // Whitelist the domains you want to allow
};
app.use(cors(corsOptions));
// TODO: implement pino.js logger later...

bootRouter(app);
if (import.meta.env.PROD) app.listen(3000);
export const viteNodeApp = app;
