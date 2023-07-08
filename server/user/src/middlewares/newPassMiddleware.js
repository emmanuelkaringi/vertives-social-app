const { newPassValidator } = require('../validators/newPasValidator');

function newPassMiddleware(req, res, next) {
    let user = req.body;
    try {
        let { value } = newPassValidator(user);
       
        req.value = value;
        
        next();
    } catch (error) {
        next({ status: 400, 
            message: error.message });   
    }    
}

module.exports = newPassMiddleware;