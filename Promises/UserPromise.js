let Config = require('../Config');
let Service = require('../Services');

let createUserPromise = (dataToSave) => {
    return new Promise( async (resolve, reject) => {
        try {
        var finalDataToSave = {};
            finalDataToSave.createdOn = new Date();
            finalDataToSave.loggedInOn = new Date();
            finalDataToSave.email_address = dataToSave.email;
            finalDataToSave.name = dataToSave.name;
            var objectQuery = 'INSERT INTO user SET ?';
            let db_call = await Service.UserService.createUser(objectQuery, finalDataToSave)
            resolve(db_call)
            return;
        }
        catch(error) {
            console.log(error, '==xcvxcv==sdfsdfsdf================================');
            // expected output: SyntaxError: unterminated string literal
            // Note - error messages will vary depending on browser
          }
    });
  }


  module.exports = {
    createUserPromise: createUserPromise
};