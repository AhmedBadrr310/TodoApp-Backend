import { timestamp, integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import z from "zod";
import { categoryTable } from "./CategorySchema";

export const tasksTable = pgTable("tasks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    isCompleted: boolean().default(false),
    createdAt: timestamp().defaultNow(),
    updatetedAt: timestamp().defaultNow(),
    categoryId: integer().references(() => categoryTable.id)
});

export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    categoryId: z.number()
});

export const editTaskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string()
})
