import express from "express"
import "dotenv/config"
import tasksRouter from "./routes/tasks"
import { json } from "express"
import cors from 'cors'
import categoriesRouter from "./routes/Categories"

const app = express()
const port = process.env.PORT
console.log("DATABASE_URL on start:", process.env.DATABASE_URL);
app.use(json());
app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*' }))
app.use('/api', tasksRouter)
app.use('/api', categoriesRouter)


//http://localhost:3000/
app.listen(port);