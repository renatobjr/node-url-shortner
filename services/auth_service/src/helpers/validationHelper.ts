import Joi from "joi";

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export default {
	loginSchema,
	registerSchema,
};
