var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
var bodyParser = require('body-parser');
const table = require('../model/commonModel')


// Multer Configuration

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const filesupload = multer({ storage: storage });

module.exports =
{
    userRegistrationList: async (req, res) => {
        try {

            let [error, registrationList] = await table.getAllList('user', {is_active: true});

            if(error) {
                return res.status(500).send({ success: false, message: `Something went to wrong please try again` });
            }

            if(registrationList) {
                return res.status(200).send({ success: true, record_count: registrationList.length, message: (registrationList.length) > 0 ? `User registration list` : `No Data Found`, user_list: registrationList  });
            }

        } catch (execption) {
            return res.status(200).send({ success: false, message: `Something went to wrong please try again` });
        }
    },

    userRegistration: async (req, res) => {
        try {

            const { name, email, mobile } = req.body;

            let sqlQuery = `INSERT INTO user (name, email, mobile) VALUES (?, ?, ?)`;
          
            let [error, registrationSuccess] = await table.insert(sqlQuery, [name, email, mobile]);

            if(error) {
                return res.status(500).send({ success: false, message: `Something went to wrong please try again` });
            }

            if(registrationSuccess) {
                return res.status(200).send({ success: true, message: `User registration complete successfully` });
            }

        } catch (execption) {
            return res.status(200).send({ success: false, message: `Something went to wrong please try again` });
        }
    },

}