import Joi from "joi";

const redirectSchema = Joi.object({
	shortUrl: Joi.string()
		.pattern(/^[A-Za-z]+$/)
		.required(),
});

export default {
	redirectSchema,
};
