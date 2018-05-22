'use strict';
/**
 * Created by Amit on 13 may 2018.
 */
var Controller = require('../Controllers');
const routes = require('express').Router();
const Joi = require('joi');



const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required()
});
 



routes.post('/loginUser', async (req, res) => {
    let fieldsRequired = {
        email: req.body.email,
        name: req.body.name
    }
    const result = Joi.validate(fieldsRequired, schema);
    if(result.error){
        res.status(400).json({ message: result.error.message });
        return;
    }
    let userController = await Controller.UserController.addUser(fieldsRequired)
    if(userController.type && userController.type == 'err'){
        res.status(400).json({ statusCode : 400, message : userController.message, data: {} });
    }
    else {
        res.status(200).json({ statusCode : 200, message : "success", data: userController});
    }
});


module.exports = routes;

