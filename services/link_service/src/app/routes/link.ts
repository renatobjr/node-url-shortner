import { Router } from "express";
import controller from "@/app/controllers/link";
import isAuth from "@/app/middlewares/isAuth";

const linkRouter = Router();

linkRouter
	.post("/", controller.create)
	.get("/", isAuth, controller.list)
	.put("/:id", isAuth, controller.update)
	.delete("/:id", isAuth, controller.remove);

const router = Router();
let BASE_URL = process.env.BASE_URL as string;
router.use(BASE_URL, linkRouter);

export default router;
