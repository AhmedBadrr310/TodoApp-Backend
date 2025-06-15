"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTaskSchema = exports.createTaskSchema = exports.tasksTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = __importDefault(require("zod"));
exports.tasksTable = (0, pg_core_1.pgTable)("tasks", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    title: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    description: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    isCompleted: (0, pg_core_1.boolean)().default(false),
    createdAt: (0, pg_core_1.timestamp)().defaultNow(),
    updatetedAt: (0, pg_core_1.timestamp)().defaultNow()
});
exports.createTaskSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string()
});
exports.editTaskSchema = zod_1.default.object({
    id: zod_1.default.number(),
    title: zod_1.default.string(),
    description: zod_1.default.string()
});
