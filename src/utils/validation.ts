import Joi from "joi";

//User registration validation rules
const userRegisterValidation = async (field: object) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(1024),
  });
  try {
    return await schema.validateAsync(field, { abortEarly: false });
  } catch (err) {
    return err;
  }
};

//User login validation rules
const userLoginValidation = async (field: object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(1024),
  });
  try {
    return await schema.validateAsync(field, { abortEarly: false });
  } catch (err) {
    return err;
  }
};

//User ID validation rules
const userIDValidation = async (field: object) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });
  try {
    return await schema.validateAsync(field, { abortEarly: false });
  } catch (err) {
    return err;
  }
};

export { userRegisterValidation, userLoginValidation, userIDValidation };
