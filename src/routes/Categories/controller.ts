import { Request, Response } from "express";
import { db } from "../../db";
import { categoryTable } from "../../db/CategorySchema";
import { ta } from "zod/dist/types/v4/locales";
import sendErrorMessage from "../../Helpers/errorResponse";
import { eq } from "drizzle-orm";


export async function getCategories(req: Request, res: Response) {
    try {
        const categories = await db.select()
            .from(categoryTable)

        res.status(200).json(categories)

    } catch (ex) {
        sendErrorMessage(ex, res)
    }
}

export async function addCategory(req: Request, res: Response) {
    try {
        const [category] = await db.insert(categoryTable).values(req.cleanBody).returning()

        res.status(201).json(category)
    } catch (ex) {
        sendErrorMessage(ex, res);
    }
}

export async function deleteCategory(req: Request, res: Response) {
    try {
        const [category] = await db.delete(categoryTable).where(eq(categoryTable.id, parseInt(req.params.id))).returning()
        res.status(200).json(category);
    } catch (e) {
        sendErrorMessage(e, res)
    }
}