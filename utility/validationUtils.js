const table = require('../model/commonModel');

const checkIfValueExists = async (tableName, condition) => {
    try {
        
        const [error, result] = await table.getRow(tableName, condition);

        if (error) {
            return res.status(500).send({ success: false, message: `Something went to wrong please try again` });
        }

        return result;
    } catch (error) {   
        return res.status(500).send({ success: false, message: `Something went to wrong please try again` });
    }
};

module.exports = {
    checkIfValueExists,
};
