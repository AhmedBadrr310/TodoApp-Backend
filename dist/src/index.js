import express from "express";
import "dotenv/config";
import tasksRouter from "./routes/tasks";
import { json } from "express";
import cors from 'cors';
const app = express();
const port = process.env.PORT;
app.use(json());
app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*' }));
app.use('/api', tasksRouter);
//http://localhost:3000/
app.listen(port);
