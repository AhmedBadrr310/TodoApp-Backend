"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
const lodash_1 = __importDefault(require("lodash"));
function validateData(schema, params) {
    return (req, res, next) => {
        try {
            if (schema) {
                schema === null || schema === void 0 ? void 0 : schema.parse(req.body);
                req.cleanBody = lodash_1.default.pick(req.body, Object.keys(schema === null || schema === void 0 ? void 0 : schema.shape));
            }
            if (params) {
                params === null || params === void 0 ? void 0 : params.parse(req.query);
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                res.status(400).json({ error: 'Invalid data', details: errorMessages });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}
