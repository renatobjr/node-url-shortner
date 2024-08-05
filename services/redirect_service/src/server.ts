import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import replyHandler from "@/app/middlewares/replyHandler";
import redirectRoute from "@/app/routes/redirect";
import { apiDocs } from "./app/docs/apiDocs";

const app = express();

app
	.use(replyHandler)
	.use(express.json())
	.use(cors())
	.use(bodyParser.json())
	.use(express.urlencoded({ extended: true }))
	.use(redirectRoute)
	.use("/swagger/docs", swaggerUi.serve, swaggerUi.setup(apiDocs));

app.get("/", async (req, res) => {
	res.json({ message: "API is online" });
});

export default app;
