const joi = require("joi");

const newUserSchema = joi.object({
  full_name: joi
    .string()
    .min(3)
    .required(),
  username: joi
    .string()
    .min(3)
    .required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  DOB: joi
    .date(),
  city: joi
    .string(),
  profilepic_url: joi
    .string(),
  password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")),
    confirm_password:joi.string().required().valid(joi.ref('password')),
});

module.exports = { newUserSchema }