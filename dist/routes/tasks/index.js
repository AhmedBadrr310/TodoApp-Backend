"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const schema_1 = require("../../db/schema");
const zod_1 = __importDefault(require("zod"));
const tasksRouter = (0, express_1.Router)();
const getParams = zod_1.default.object({
    title: zod_1.default.string().optional(),
    sort: zod_1.default.enum(['asc', 'desc']).optional().default('desc')
});
tasksRouter.get('/tasks', (0, validationMiddleware_1.validateData)(undefined, getParams), controller_1.getTasks);
tasksRouter.get('/tasks/:id', controller_1.getTask);
tasksRouter.put('/tasks/:id', controller_1.completeTask);
tasksRouter.put('/tasks/', (0, validationMiddleware_1.validateData)(schema_1.editTaskSchema), controller_1.editTask);
tasksRouter.delete('/tasks/:id', controller_1.deleteTask);
tasksRouter.post('/tasks', (0, validationMiddleware_1.validateData)(schema_1.createTaskSchema), controller_1.createTask);
exports.default = tasksRouter;
