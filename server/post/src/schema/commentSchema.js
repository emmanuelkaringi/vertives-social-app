const joi = require("joi");

const commentSchema = joi.object({
  new_password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")),
    confirm_password:joi.string().required().valid(joi.ref('new_password')),
});

module.exports = { commentSchema }