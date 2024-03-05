import { default as authRoute } from "routes/auth";
const baseURL = "/api/v1";
export const bootRouter = (app) => {
  app.use(`${baseURL}/auth`, authRoute);
};
