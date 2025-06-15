import { db } from "../../db";
import { tasksTable } from "../../db/schema";
import { asc, desc, eq, ilike, sql } from "drizzle-orm";
export async function getTasks(req, res) {
    try {
        const tasks = await db.select()
            .from(tasksTable)
            .where(req.query.title ? ilike(tasksTable.title, '%' + req.query.title + '%') : sql `TRUE`)
            .orderBy(req.query.sort && req.query.sort === 'asc' ? asc(tasksTable.createdAt) : desc(tasksTable.createdAt));
        res.status(200).json(tasks);
    }
    catch (e) {
        sendErrorMessage(e, res);
    }
}
export async function getTask(req, res) {
    try {
        const [task] = await db.select()
            .from(tasksTable)
            .where(eq(tasksTable.id, parseInt(req.params.id)));
        res.status(200).json(task);
    }
    catch (e) {
        sendErrorMessage(e, res);
    }
}
export async function editTask(req, res) {
    try {
        const [task] = await db.update(tasksTable).
            set({ title: req.cleanBody.title, description: req.cleanBody.description, updatetedAt: new Date() }).
            where(eq(tasksTable.id, parseInt(req.cleanBody.id))).returning();
        if (!task) {
            res.status(400).send({ code: 400, message: "error editing the task" });
        }
        res.status(200).json(task);
    }
    catch (e) {
        sendErrorMessage(e, res);
    }
}
export async function completeTask(req, res) {
    try {
        const [task] = await db.update(tasksTable).set({ isCompleted: true }).where(eq(tasksTable.id, Number.parseInt(req.params.id))).returning();
        if (!task) {
            res.status(401).send({ code: 401, message: "error creating the task" });
        }
        res.status(200).json(task);
    }
    catch (e) {
        sendErrorMessage(e, res);
    }
}
export async function deleteTask(req, res) {
    try {
        const result = await db.delete(tasksTable).where(eq(tasksTable.id, parseInt(req.params.id))).returning();
        if (result.length === 0) {
            res.status(400).send({ code: 401, message: "error deleteing the task" });
        }
        res.status(200).json({ message: "deleted successfuly" });
    }
    catch (e) {
        sendErrorMessage(e, res);
    }
}
export async function createTask(req, res) {
    try {
        const [task] = await db.insert(tasksTable).values(req.cleanBody).returning();
        if (!task) {
            res.status(401).send({ code: 401, message: "error creating the task" });
        }
        res.status(201).json(task);
    }
    catch (e) {
        sendErrorMessage(e, res);
    }
}
function sendErrorMessage(e, res) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).send({ code: 401, message });
}
