const joi = require("joi");

const newPostSchema = joi.object({
  content_txt: joi
    .string()
    .required()
});

module.exports = { newPostSchema }