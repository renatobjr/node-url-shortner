import { Handler } from "express";
import redirect from "@/app/models/redirect";

const getLinkAndRedirect: Handler = async (req, res) => {
	const result = await redirect.getLink(req.params.shortUrl);
	if (result.httpCode === 404) {
		return res.reply(result.httpCode, result.data);
	}

	res.redirect(result.data as string);
};

export default {
	getLinkAndRedirect,
};
