import { Handler } from "express";
import validationHelper from "@/helpers/validationHelper";
import redirect from "@/app/models/redirect";

const getLinkAndRedirect: Handler = async (req, res) => {
	const { error } = validationHelper.redirectSchema.validate(req.params);
	if (error) {
		return res.reply(400, error.message);
	}

	const result = await redirect.getLink(req.params.shortUrl);
	if (result.httpCode === 404) {
		return res.reply(result.httpCode, result.data);
	}

	res.redirect(result.data as string);
};

export default {
	getLinkAndRedirect,
};
