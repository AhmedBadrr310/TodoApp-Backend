"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
exports.getTask = getTask;
exports.editTask = editTask;
exports.completeTask = completeTask;
exports.deleteTask = deleteTask;
exports.createTask = createTask;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield db_1.db.select()
                .from(schema_1.tasksTable)
                .where(req.query.title ? (0, drizzle_orm_1.ilike)(schema_1.tasksTable.title, '%' + req.query.title + '%') : (0, drizzle_orm_1.sql) `TRUE`)
                .orderBy(req.query.sort && req.query.sort === 'asc' ? (0, drizzle_orm_1.asc)(schema_1.tasksTable.createdAt) : (0, drizzle_orm_1.desc)(schema_1.tasksTable.createdAt));
            res.status(200).json(tasks);
        }
        catch (e) {
            sendErrorMessage(e, res);
        }
    });
}
function getTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [task] = yield db_1.db.select()
                .from(schema_1.tasksTable)
                .where((0, drizzle_orm_1.eq)(schema_1.tasksTable.id, parseInt(req.params.id)));
            res.status(200).json(task);
        }
        catch (e) {
            sendErrorMessage(e, res);
        }
    });
}
function editTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [task] = yield db_1.db.update(schema_1.tasksTable).
                set({ title: req.cleanBody.title, description: req.cleanBody.description, updatetedAt: new Date() }).
                where((0, drizzle_orm_1.eq)(schema_1.tasksTable.id, parseInt(req.cleanBody.id))).returning();
            if (!task) {
                res.status(400).send({ code: 400, message: "error editing the task" });
            }
            res.status(200).json(task);
        }
        catch (e) {
            sendErrorMessage(e, res);
        }
    });
}
function completeTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [task] = yield db_1.db.update(schema_1.tasksTable).set({ isCompleted: true }).where((0, drizzle_orm_1.eq)(schema_1.tasksTable.id, Number.parseInt(req.params.id))).returning();
            if (!task) {
                res.status(401).send({ code: 401, message: "error creating the task" });
            }
            res.status(200).json(task);
        }
        catch (e) {
            sendErrorMessage(e, res);
        }
    });
}
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_1.db.delete(schema_1.tasksTable).where((0, drizzle_orm_1.eq)(schema_1.tasksTable.id, parseInt(req.params.id))).returning();
            if (result.length === 0) {
                res.status(400).send({ code: 401, message: "error deleteing the task" });
            }
            res.status(200).json({ message: "deleted successfuly" });
        }
        catch (e) {
            sendErrorMessage(e, res);
        }
    });
}
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [task] = yield db_1.db.insert(schema_1.tasksTable).values(req.cleanBody).returning();
            if (!task) {
                res.status(401).send({ code: 401, message: "error creating the task" });
            }
            res.status(201).json(task);
        }
        catch (e) {
            sendErrorMessage(e, res);
        }
    });
}
function sendErrorMessage(e, res) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).send({ code: 401, message });
}
