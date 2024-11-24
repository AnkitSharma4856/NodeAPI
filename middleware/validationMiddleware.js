const CONSTANT = require('../utility/constant');
// const { checkIfValueExists } = require('../utility/validationUtils');

exports.userValidation = async (req, res, next) => {
    try {
        
        const { name, email, mobile } = req.body;
        
        if(!name) {
            return res.status(200).send({ success: false, message: `Please enter the name` });
        }

        if(!CONSTANT.nameRegex.test(name)) {
            return res.status(200).send({ success: false, message: `Invalid name` });
        }

        if(!email) {
            return res.status(200).send({ success: false, message: `Please enter the email` });
        }

        if(!CONSTANT.emailRegex.test(email)) {
            return res.status(200).send({ success: false, message: `Invalid email` });
        }

        if(!mobile) {
            return res.status(200).send({ success: false, message: `Please enter the mobile number` });
        }

        if(!CONSTANT.mobileRegex.test(mobile)) {
            return res.status(200).send({ success: false, message: `Invalid mobile number` });
        }
        
    } catch (exception) {
        return res.status(500).send({ success: false, message: `Something went to wrong please try again` });
    }
    next();
}