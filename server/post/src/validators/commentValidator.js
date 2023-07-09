const { commentSchema } = require('../schema/commentSchema');
 
function commentValidator(body) {
    let user = commentSchema.validate(body, { abortEarly: false, stripUnknown: true, });

    if (user.error?.details.length > 0) {
        let message = user.error.details.map((err)=> err.message);
        throw new Error(message.join("\n"));
    } else {
        return user;
    }
 }

 module.exports = { commentValidator }