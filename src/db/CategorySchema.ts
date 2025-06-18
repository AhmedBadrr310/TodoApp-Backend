import { timestamp, integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import z from "zod";

export const categoryTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),

});

export const createSchema = z.object({
    title: z.string()

})