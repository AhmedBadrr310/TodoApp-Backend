import { Request, Response } from "express";
import { db } from "../../db";
import { tasksTable } from "../../db/TaskSchema";
import { asc, desc, eq, ilike, sql } from "drizzle-orm";
import sendErrorMessage from "../../Helpers/errorResponse";
import { categoryTable } from "../../db/CategorySchema";


export async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await db.select()
            .from(tasksTable)
            .where(req.query.title ? ilike(tasksTable.title, '%' + req.query.title as string + '%') : sql`TRUE` && eq(categoryTable.id, parseInt(req.query.categoryId as string)))
            .orderBy(req.query.sort && req.query.sort === 'asc' ? asc(tasksTable.createdAt) : desc(tasksTable.createdAt))

        res.status(200).json(tasks)
    } catch (e) {
        sendErrorMessage(e, res);
    }

}

export async function getTask(req: Request, res: Response) {
    try {
        const [task] = await db.select()
            .from(tasksTable)
            .where(eq(tasksTable.id, parseInt(req.params.id)))

        res.status(200).json(task)
    } catch (e) {
        sendErrorMessage(e, res);
    }
}

export async function editTask(req: Request, res: Response) {
    try {
        const [task] = await db.update(tasksTable).
            set({ title: req.cleanBody.title, description: req.cleanBody.description, updatetedAt: new Date() }).
            where(eq(tasksTable.id, parseInt(req.cleanBody.id))).returning();

        if (!task) {
            res.status(400).send({ code: 400, message: "error editing the task" })

            res.status(200).json(task);
        }

    } catch (e) {
        sendErrorMessage(e, res);
    }
}

export async function completeTask(req: Request, res: Response) {
    try {
        const [task] = await db.update(tasksTable).set({ isCompleted: true }).where(eq(tasksTable.id, Number.parseInt(req.params.id))).returning();
        if (!task) {
            res.status(401).send({ code: 401, message: "error creating the task" })
        }

        res.status(200).json(task)
    } catch (e) {
        sendErrorMessage(e, res);
    }
}



export async function deleteTask(req: Request, res: Response) {
    try {
        const result = await db.delete(tasksTable).where(eq(tasksTable.id, parseInt(req.params.id))).returning()
        if (result.length === 0) {
            res.status(400).send({ code: 401, message: "error deleteing the task" })
        }
        res.status(200).json({ message: "deleted successfuly" });
    } catch (e) {
        sendErrorMessage(e, res);
    }

}

export async function createTask(req: Request, res: Response) {
    try {
        const [task] = await db.insert(tasksTable).values(req.cleanBody).returning();
        if (!task) {
            res.status(401).send({ code: 401, message: "error creating the task" })
        }

        res.status(201).json(task)

    } catch (e) {
        sendErrorMessage(e, res);
    }
}
