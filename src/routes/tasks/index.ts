import { Router } from "express";
import { getTasks, createTask, deleteTask, completeTask, editTask, getTask } from "./controller";
import { validateData } from "../../middlewares/validationMiddleware";
import { createTaskSchema, editTaskSchema } from "../../db/TaskSchema";
import z from "zod";

const tasksRouter = Router()

const getParams = z.object({
    title: z.string().optional(),
    sort: z.enum(['asc', 'desc']).optional().default('desc'),
    categoryId: z.number()
})



tasksRouter.get('/tasks', validateData(undefined, getParams), getTasks)
tasksRouter.get('/tasks/:id', getTask)
tasksRouter.put('/tasks/:id', completeTask)
tasksRouter.put('/tasks/', validateData(editTaskSchema), editTask)
tasksRouter.delete('/tasks/:id', deleteTask)
tasksRouter.post('/tasks', validateData(createTaskSchema), createTask)

export default tasksRouter