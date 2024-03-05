import express from "express";
import { bootRouter } from "src/router.js";
import cors from "cors";
const app = express();
// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"], // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));

bootRouter(app);
if (import.meta.env.PROD) app.listen(3000);
export const viteNodeApp = app;
