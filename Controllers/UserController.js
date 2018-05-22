'use strict';

var Service = require('../Services');
//var async = require('async');
//var Models = require('../Models');
var Config = require('../Config');
var Promises = require('../Promises');
var Token = require('../Utils');


var tokenData = null;

var addUser = (payloadData) => {
    try {
        return new Promise(async (resolve, reject) => {
            //payloadData.email = Promises.CommonPromise.CryptData(payloadData.email)
            let userData = await Promises.UserPromise.createUserPromise(payloadData)
            if(userData.type == 'err'){
                return resolve(userData)
            }
            else {
                let tokenData = {
                    id: userData.data.insertId,
                    email: payloadData.email,
                    type : "ADMIN"
                };
                let tokenResult = await Token.TokenManager.setToken(tokenData);
                if(tokenResult.type == 'err'){
                    return resolve(tokenResult)
                }
                else {
                    resolve(tokenResult.data[0])
                }
            }
        })
    }
      catch(error) {
        console.log(error, '==xcvxcv======');
      }
};


module.exports = {
    addUser: addUser,
    checkUserAuthCtrl : checkUserAuthCtrl
};