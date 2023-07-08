const { newPostValidator } = require('../validators/newPostValidator');

function newPostMiddleware(req, res, next) {
    let user = req.body;
    try {
        let { value } = newPostValidator(user);
       
        req.value = value;
        
        next();
    } catch (error) {
        next({ status: 400, 
            message: error.message });   
    }    
}

module.exports = newPostMiddleware;