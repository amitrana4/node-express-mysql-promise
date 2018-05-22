'use strict';

let Config = require('../Config');
let mysql_pool = Config.dbConfig.mysql_pool;

let queryExecute = (query, val) => {
    return new Promise((resolve, reject) => {
        try {
            mysql_pool.getConnection(function(err,connection){
                    if (err) {
                    connection.release();
                    resolve({type : 'err', message : err.sqlMessage});
                    return;  
                    }   
                    connection.query(query, val, function(err,rows){
                     //   console.log(err, rows)
                        connection.release();
                        if(!err) {
                            resolve({type : 'success', data: rows});
                            return;  
                        } 
                        else {
                            resolve({type : 'err', message : err.sqlMessage});
                            return;  
                        }          
                    });
                    connection.on('error', function(err) {      
                        resolve({type : 'err', message : err.sqlMessage});
                        return;      
                    });
                });
        }
        catch(error) {
            console.log(error, '==xcvxcv==sdfsdfsdf================================');
            // expected output: SyntaxError: unterminated string literal
            // Note - error messages will vary depending on browser
            // One of the most conspicuous trend of today's world is a colosal upsurge in the usage of english language in almost every part of the world, thanks to globalisation
            //there 
        }
    });
}




//Get Users from DB
var getUserByAuthToken = async (auth_token) => {
    var objectQuery = 'SELECT * FROM user WHERE auth_token = ?';
    return await queryExecute(objectQuery, auth_token)
};

//Insert User in DB
var createUser = async (objectQuery, val) => {
    return await queryExecute(objectQuery, val)
}

//Update User in DB
var updateUser = async (objectQuery, val) => {
    return await queryExecute(objectQuery, val)
};

//Update User in DB
var updateTokenData = async (tokenToSave, userId) => {
    let setQuery = [tokenToSave, userId];
    let objectQuery = 'UPDATE user SET auth_token = ? WHERE id = ?'
    let userdata = await queryExecute(objectQuery, setQuery)
    if(userdata.type == 'success'){
        return await getUserByAuthToken(tokenToSave)
    }
    else {
        return userdata;
    }
};


//Delete User in DB
var deleteUser = async (objectQuery) => {
    return await queryExecute(objectQuery)
};

module.exports = {
    getUserByAuthToken: getUserByAuthToken,
    createUser: createUser,
    updateUser: updateUser,
    updateTokenData: updateTokenData,
    deleteUser: deleteUser
};

