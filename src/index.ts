import express from "express";
import "dotenv/config";
import tasksRouter from "./routes/tasks";
import { json } from "express";
import cors from 'cors';

const app = express();

// Middleware setup
app.use(json());
app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*' }));

// Route setup
app.use('/api', tasksRouter);

// Export the configured app
export default app;
