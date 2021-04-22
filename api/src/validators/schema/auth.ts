import Joi, { ObjectSchema } from "joi";

export const registerSchema: ObjectSchema = Joi.object().keys({
  phoneNumber: Joi.string().min(10).required(),
  password: Joi.string().min(6).required(),
});
