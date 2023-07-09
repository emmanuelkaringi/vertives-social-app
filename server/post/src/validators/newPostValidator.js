const { newPostSchema } = require('../schema/newPostSchema');
 
function newPostValidator(body) {
    let post = newPostSchema.validate(body, { abortEarly: false, stripUnknown: true, });

    if (post.error?.details.length > 0) {
        let message = user.error.details.map((err)=> err.message);
        throw new Error(message.join("\n"));
    } else {
        return post;
    }
 }

 module.exports = { newPostValidator }