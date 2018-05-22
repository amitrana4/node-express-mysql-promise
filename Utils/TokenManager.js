'use strict';
/**
 * Created by Amit on 13 may 2018.
 */
var Config = require('../Config');
var Jwt = require('jsonwebtoken');
var Service = require('../Services');


var getTokenFromDB = function (userId, userType,token, callback) {
    var userData = null;
    var criteria = {
        _id: userId,
        accessToken : token
    };
    async.series([
        function (cb) {
            if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.CUSTOMER){
                Service.CustomerService.getCustomer(criteria,{},{lean:true}, function (err, dataAry) {
                    if (err){
                        cb(err)
                    }else {
                        if (dataAry && dataAry.length > 0){
                            userData = dataAry[0];
                            cb();
                        }else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });

            }
            else if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.DRIVER){
                Service.DriverService.getDriver(criteria,{},{lean:true}, function (err, dataAry) {
                    if (err){
                        cb(err)
                    }else {
                        if (dataAry && dataAry.length > 0){
                            userData = dataAry[0];
                            cb();
                        }else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });

            }
            else if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.ADMIN){
                Service.AdminService.getAdmin(criteria,{},{lean:true}, function (err, dataAry) {
                    if (err){
                        callback(err)
                    }else {
                        if (dataAry && dataAry.length > 0){
                            userData = dataAry[0];
                            cb();
                        }else {
                            callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });
            }else {
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err){
            callback(err)
        }else {
            if (userData && userData._id){
                userData.id = userData._id;
                userData.type = userType;
            }
            callback(null,{userData: userData})
        }

    });
};

var setTokenInDB = (userId, userType, tokenToSave) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.ADMIN){
                let updateQuery = await Service.UserService.updateTokenData(tokenToSave, userId)
                //let updateQuery = await Service.UserService.updateUser(objectQuery,setQuery)
                console.log(updateQuery, '========================updateQuery')
                return resolve(updateQuery);
            }
            else {
                return resolve(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
        catch(error) {
            console.log(error, '==setTokenInDB=========================');
            // expected output: SyntaxError: unterminated string literal
            // Note - error messages will vary depending on browser
        }
    });
}

var expireTokenInDB = function (userId,userType, callback) {
    var criteria = {
        _id: userId
    };
    var setQuery = {
        accessToken : null
    };
    var succData = {}
    async.series([
        function (cb) {
            if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.ADMIN){
                Service.CustomerService.updateCustomer(criteria,setQuery,{new:true}, function (err, dataAry) {
                    if (err){
                        cb(err)
                    }else {
                        if (dataAry && dataAry.length > 0){
                            cb();
                        }else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }
                });

            }
            else if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.DRIVER){
                Service.DriverService.updateDriver(criteria,setQuery,{new:true}, function (err, dataAry) {
                    if (err){
                        cb(err)
                    }else {
                        if (dataAry){
                            cb();
                        }else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });

            }
            else if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.ADMIN){
                Service.AdminService.updateAdmin(criteria,setQuery,{new:true}, function (err, dataAry) {
                    if (err){
                        callback(err)
                    }else {
                       /* if (dataAry && dataAry.length > 0){
                            cb();
                        }else {
                            callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }*/
                        succData = dataAry;
                        cb()
                    }

                });
            }else {
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err){
            callback(err)
        }else {
            callback(null, succData)
        }

    });
};


var verifyToken = function (token, callback) {
    var response = {
        valid: false
    };
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            callback(err)
        } else {
            getTokenFromDB(decoded.id, decoded.type,token, callback);
        }
    });
};

var verifyCharityToken = function (token, callback) {
    var response = {
        valid: false
    };
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            callback(err)
        } else {
            getCharityTokenFromDB(decoded.id, decoded.type,token, callback);
        }
    });
};

var verifyDonorToken = function (token, callback) {
    var response = {
        valid: false
    };
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            callback(err)
        } else {
            getDonorTokenFromDB(decoded.id, decoded.type,token, callback);
        }
    });
};

var getCharityTokenFromDB = function (userId, userType,token, callback) {
    var userData = null;
    var criteria = {
        _id: userId,
        accessToken : token
    };
    async.series([
        function (cb) {
            if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.CHARITYOWNER){
                Service.CharityService.getCharityOwnerId(criteria,{},{lean:true}, function (err, dataAry) {
                    if (err){
                        cb(err)
                    }else {
                        if (dataAry && dataAry.length > 0){
                            userData = dataAry[0];
                            cb();
                        }else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });

            }else {
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err){
            callback(err)
        }else {
            if (userData && userData._id){
                userData.id = userData._id;
                userData.type = userType;
            }
            callback(null,{userData: userData})
        }

    });
};

var getDonorTokenFromDB = function (userId, userType,token, callback) {
    var userData = null;
    var criteria = {
        _id: userId,
        accessToken : token
    };
    async.series([
        function (cb) {
            if (userType == Config.APP_CONSTANTS.DATABASE.USER_ROLES.DONOR){
                Service.DonorService.getDonor(criteria,{},{lean:true}, function (err, dataAry) {
                    if (err){
                        cb(err)
                    }else {
                        if (dataAry && dataAry.length > 0){
                            userData = dataAry[0];
                            cb();
                        }else {
                            cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN)
                        }
                    }

                });

            }else {
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
    ], function (err, result) {
        if (err){
            callback(err)
        }else {
            if (userData && userData._id){
                userData.id = userData._id;
                userData.type = userType;
            }
            callback(null,{userData: userData})
        }

    });
};

let setToken = (tokenData) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!tokenData.id || !tokenData.type) {
                resolve(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
            } else {
                var tokenToSend = Jwt.sign(tokenData, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY);
                let tokenResult = await setTokenInDB(tokenData.id,tokenData.type, tokenToSend)
                return resolve(tokenResult);
            }
    }
    catch(error) {
        console.log(error, '==xcvxcv==sdfsdfsdf================================');
        // expected output: SyntaxError: unterminated string literal
        // Note - error messages will vary depending on browser
    }
    });
}

var expireToken = function (token, callback) {
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN);
        } else {
            expireTokenInDB(decoded.id,decoded.type, function (err, data) {
                callback(err, data)
            });
        }
    });
};

var decodeToken = function (token, callback) {
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decodedData) {
        if (err) {
            callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN);
        } else {
            callback(null, decodedData)
        }
    })
};

module.exports = {
    expireToken: expireToken,
    setToken: setToken,
    verifyDonorToken: verifyDonorToken,
    verifyToken: verifyToken,
    verifyCharityToken: verifyCharityToken,
    decodeToken: decodeToken
};