import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import replyHandler from "@/app/middlewares/replyHandler";
import linkRoute from "@/app/routes/link";

const app = express();

app
	.use(replyHandler)
	.use(express.json())
	.use(cors())
	.use(bodyParser.json())
	.use(express.urlencoded({ extended: true }))
	.use(linkRoute);

app.get("/", async (req, res) => {
	res.json({ message: "API is online" });
});

export default app;
