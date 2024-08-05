import Joi from "joi";

const createSchema = Joi.object({
	original_url: Joi.string().required(),
});

const updateSchema = Joi.object({
	original_url: Joi.string().required(),
});

const removeSchema = Joi.object({
	id: Joi.string().required(),
});

export default {
	createSchema,
	updateSchema,
	removeSchema,
};
