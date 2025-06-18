import { Router } from "express";
import { addCategory, deleteCategory, getCategories } from "./controller";
import { validateData } from "../../middlewares/validationMiddleware";
import { createSchema } from "../../db/CategorySchema";


const categoriesRouter = Router();

categoriesRouter.post('/categories', validateData(createSchema), addCategory)
categoriesRouter.get('/categories', getCategories)
categoriesRouter.delete('/categories:id', deleteCategory)

export default categoriesRouter