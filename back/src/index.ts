import express, { Express, Request, Response } from "express";
import { poolPromise } from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import { getReport } from "./controllers/report.controller";
import { getCharts } from "./controllers/chart.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.get("/api/report", getReport);
app.get("/api/charts", getCharts);

app.listen(port, async () => {
  await poolPromise;
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
