import { Response } from "express";

export default function sendErrorMessage(e: any, res: Response) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).send({ code: 401, message });
}