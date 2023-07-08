const { newPostSchema } = require('../schema/newPostSchema');
 
function newPostValidator(body) {
    let user = newPostSchema.validate(body, { abortEarly: false, stripUnknown: true, });

    if (user.error?.details.length > 0) {
        let message = user.error.details.map((err)=> err.message);
        throw new Error(message.join("\n"));
    } else {
        return user;
    }
 }

 module.exports = { newPostValidator }