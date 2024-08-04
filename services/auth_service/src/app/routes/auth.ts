import { Router } from "express";
import controller from "@/app/controllers/auth";

const authRouter = Router();

authRouter
	.get("/", controller.login)
	.post("/", controller.register)
	.post("/:token", controller.verify);

const router = Router();
let BASE_URL = process.env.BASE_URL as string;
router.use(BASE_URL, authRouter);

export default router;
