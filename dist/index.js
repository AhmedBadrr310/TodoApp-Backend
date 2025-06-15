"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const tasks_1 = __importDefault(require("./routes/tasks"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
console.log("DATABASE_URL on start:", process.env.DATABASE_URL);
app.use((0, express_2.json)());
app.use((0, cors_1.default)({ origin: '*', methods: '*', allowedHeaders: '*' }));
app.use('/api', tasks_1.default);
//http://localhost:3000/
app.listen(port);
