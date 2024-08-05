import { Router } from "express";
import controller from "@/app/controllers/redirect";

const redirectRouter = Router();

redirectRouter.get("/:shortUrl", controller.getLinkAndRedirect);

export default redirectRouter;
